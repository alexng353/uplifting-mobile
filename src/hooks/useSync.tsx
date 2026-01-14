import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import {
	getLastSyncTime,
	getPendingWorkout,
	setLastSyncTime,
	setPendingWorkout,
	updatePreviousSets,
} from "../services/local-storage";
import { useAuth } from "./useAuth";
import { useOnline } from "./useOnline";

interface SyncState {
	isSyncing: boolean;
	lastSyncTime: Date | null;
	hasPendingWorkout: boolean;
	error: string | null;
}

export function useSync() {
	const { isOnline } = useOnline();
	const { isAuthenticated } = useAuth();
	const [state, setState] = useState<SyncState>({
		isSyncing: false,
		lastSyncTime: null,
		hasPendingWorkout: false,
		error: null,
	});

	// Load initial state
	useEffect(() => {
		const load = async () => {
			const [pending, lastSync] = await Promise.all([
				getPendingWorkout(),
				getLastSyncTime(),
			]);
			setState((prev) => ({
				...prev,
				hasPendingWorkout: pending !== null,
				lastSyncTime: lastSync,
			}));
		};
		load();
	}, []);

	const forceSync = useCallback(async () => {
		if (!isOnline || !isAuthenticated) {
			setState((prev) => ({
				...prev,
				error: isOnline ? "Not authenticated" : "No internet connection",
			}));
			return false;
		}

		const pending = await getPendingWorkout();
		if (!pending) {
			setState((prev) => ({ ...prev, hasPendingWorkout: false }));
			return true;
		}

		setState((prev) => ({ ...prev, isSyncing: true, error: null }));

		try {
			const { data, error } = await api.syncWorkout({
				body: {
					name: pending.name,
					start_time: pending.startTime,
					end_time: new Date().toISOString(),
					privacy: pending.privacy,
					gym_location: pending.gymLocation,
					exercises: pending.exercises.map((e) => ({
						exercise_id: e.exerciseId,
						profile_id: e.profileId,
						sets: e.sets.map((s) => ({
							reps: s.reps,
							weight: String(s.weight),
							weight_unit: s.weightUnit,
							created_at: s.createdAt,
						})),
					})),
				},
			});

			if (error || !data) {
				throw new Error("Failed to sync workout");
			}

			// Update previous sets with server response
			if (data.previous_sets) {
				for (const ps of data.previous_sets) {
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

			// Clear pending workout
			await setPendingWorkout(null);
			await setLastSyncTime(new Date());

			setState((prev) => ({
				...prev,
				isSyncing: false,
				hasPendingWorkout: false,
				lastSyncTime: new Date(),
			}));

			return true;
		} catch (err) {
			setState((prev) => ({
				...prev,
				isSyncing: false,
				error: err instanceof Error ? err.message : "Sync failed",
			}));
			return false;
		}
	}, [isOnline, isAuthenticated]);

	// Auto-sync when coming online
	useEffect(() => {
		if (isOnline && isAuthenticated && state.hasPendingWorkout) {
			forceSync();
		}
	}, [isOnline, isAuthenticated, state.hasPendingWorkout, forceSync]);

	return {
		...state,
		isOnline,
		forceSync,
	};
}
