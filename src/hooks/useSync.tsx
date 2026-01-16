import { useCallback, useMemo } from "react";
import {
	getLastSyncTime,
	getPendingWorkout,
	setLastSyncTime,
	setPendingWorkout,
	type StoredWorkout,
	updatePreviousSets,
} from "../services/local-storage";
import type { SyncWorkoutRequest } from "../lib/api-openapi-gen/types.gen";
import { useSyncedSave } from "./useSyncedSave";
import { useSyncWorkout } from "./useSyncWorkout";

/**
 * Hook for syncing workouts to the server.
 * Uses the generic useSyncedSave hook with workout-specific configuration.
 */
export function useSync() {
	const syncWorkoutMutation = useSyncWorkout();

	// Memoize the sync function to prevent unnecessary re-renders
	const syncRemote = useCallback(
		async (data: SyncWorkoutRequest) => {
			const result = await syncWorkoutMutation.mutateAsync(data);
			return result;
		},
		[syncWorkoutMutation],
	);

	// Transform local workout to remote format
	const toRemote = useCallback(
		(local: StoredWorkout): SyncWorkoutRequest & { kind?: string } => ({
			name: local.name,
			start_time: local.startTime,
			end_time: new Date().toISOString(),
			privacy: local.privacy,
			gym_location: local.gymLocation,
			kind: local.kind,
			exercises: local.exercises.map((e) => ({
				exercise_id: e.exerciseId,
				profile_id: e.profileId,
				sets: e.sets.map((s) => ({
					reps: s.reps,
					weight: String(s.weight),
					weight_unit: s.weightUnit,
					created_at: s.createdAt,
				})),
			})),
		}),
		[],
	);

	// Handle successful sync - update previous sets cache
	const onSyncSuccess = useCallback(
		async (
			response: Awaited<ReturnType<typeof syncWorkoutMutation.mutateAsync>>,
		) => {
			if (response.previous_sets) {
				for (const ps of response.previous_sets) {
					await updatePreviousSets(
						ps.exercise_id,
						ps.profile_id ?? null,
						ps.sets.map((s) => ({
							id: crypto.randomUUID(),
							reps: s.reps,
							weight: Number(s.weight),
							weightUnit: s.weight_unit,
							createdAt: new Date().toISOString(),
						})),
					);
				}
			}
		},
		[],
	);

	const result = useSyncedSave({
		getPending: getPendingWorkout,
		saveLocal: async (data: StoredWorkout) => {
			await setPendingWorkout(data);
		},
		clearPending: async () => {
			await setPendingWorkout(null);
		},
		toRemote,
		syncRemote,
		onSyncSuccess,
		getLastSyncTime,
		setLastSyncTime,
	});

	// Map hasPending to hasPendingWorkout for backwards compatibility
	return useMemo(
		() => ({
			isSyncing: result.isSyncing,
			lastSyncTime: result.lastSyncTime,
			hasPendingWorkout: result.hasPending,
			error: result.error,
			retryCount: result.retryCount,
			nextRetryAt: result.nextRetryAt,
			isOnline: result.isOnline,
			forceSync: result.forceSync,
		}),
		[result],
	);
}
