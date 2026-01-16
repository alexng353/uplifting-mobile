import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	generateId,
	getCurrentWorkout,
	getPendingWorkout,
	getSettings,
	type StoredSet,
	type StoredWorkout,
	type StoredWorkoutExercise,
	setCurrentWorkout,
	setPendingWorkout,
	updatePreviousSets,
} from "../services/local-storage";

interface WorkoutContextValue {
	workout: StoredWorkout | null;
	isActive: boolean;
	startWorkout: () => Promise<void>;
	logRestDay: () => Promise<StoredWorkout>;
	addExercise: (
		exerciseId: string,
		exerciseName: string,
		profileId?: string,
	) => Promise<void>;
	removeExercise: (exerciseId: string) => Promise<void>;
	reorderExercises: (newOrder: string[]) => Promise<void>;
	addSet: (
		exerciseId: string,
		reps: number,
		weight: number,
		weightUnit: string,
	) => Promise<void>;
	updateSet: (
		exerciseId: string,
		setId: string,
		updates: Partial<StoredSet>,
	) => Promise<void>;
	removeSet: (exerciseId: string, setId: string) => Promise<void>;
	finishWorkout: (
		name?: string,
		gymLocation?: string,
	) => Promise<StoredWorkout>;
	cancelWorkout: () => Promise<void>;
	hasPendingWorkout: boolean;
}

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export function WorkoutProvider({ children }: { children: ReactNode }) {
	const [workout, setWorkout] = useState<StoredWorkout | null>(null);
	const [hasPendingWorkout, setHasPendingWorkout] = useState(false);

	// Load current workout on mount
	useEffect(() => {
		const loadWorkout = async () => {
			const [current, pending] = await Promise.all([
				getCurrentWorkout(),
				getPendingWorkout(),
			]);

			setHasPendingWorkout(pending !== null);

			if (current) {
				// Check if workout is too old (> 24 hours)
				const startTime = new Date(current.startTime);
				const now = new Date();
				const hoursDiff =
					(now.getTime() - startTime.getTime()) / (1000 * 60 * 60);

				if (hoursDiff > 24) {
					// Auto-cap the workout - move to pending for sync
					const cappedWorkout = { ...current };
					await setPendingWorkout(cappedWorkout);
					await setCurrentWorkout(null);
					setHasPendingWorkout(true);
				} else {
					setWorkout(current);
				}
			}
		};
		loadWorkout();
	}, []);

	const saveWorkout = useCallback(async (w: StoredWorkout | null) => {
		setWorkout(w);
		await setCurrentWorkout(w);
	}, []);

	const startWorkout = useCallback(async () => {
		const settings = await getSettings();
		const newWorkout: StoredWorkout = {
			id: generateId(),
			startTime: new Date().toISOString(),
			exercises: [],
			privacy: settings.defaultPrivacy,
			kind: "workout",
		};
		await saveWorkout(newWorkout);
	}, [saveWorkout]);

	const logRestDay = useCallback(async (): Promise<StoredWorkout> => {
		const settings = await getSettings();
		const now = new Date().toISOString();
		const restDay: StoredWorkout = {
			id: generateId(),
			startTime: now,
			exercises: [],
			privacy: settings.defaultPrivacy,
			kind: "rest",
			name: "Rest Day",
		};

		// Rest days go directly to pending (no active workout state)
		await setPendingWorkout(restDay);
		setHasPendingWorkout(true);

		return restDay;
	}, []);

	const addExercise = useCallback(
		async (exerciseId: string, exerciseName: string, profileId?: string) => {
			if (!workout) return;

			const newExercise: StoredWorkoutExercise = {
				exerciseId,
				exerciseName,
				profileId,
				sets: [],
			};

			const updated = {
				...workout,
				exercises: [...workout.exercises, newExercise],
			};
			await saveWorkout(updated);
		},
		[workout, saveWorkout],
	);

	const removeExercise = useCallback(
		async (exerciseId: string) => {
			if (!workout) return;

			const updated = {
				...workout,
				exercises: workout.exercises.filter((e) => e.exerciseId !== exerciseId),
			};
			await saveWorkout(updated);
		},
		[workout, saveWorkout],
	);

	const reorderExercises = useCallback(
		async (newOrder: string[]) => {
			if (!workout) return;

			const exerciseMap = new Map(
				workout.exercises.map((e) => [e.exerciseId, e]),
			);
			const reordered = newOrder
				.map((id) => exerciseMap.get(id))
				.filter((e): e is StoredWorkoutExercise => e !== undefined);

			const updated = { ...workout, exercises: reordered };
			await saveWorkout(updated);
		},
		[workout, saveWorkout],
	);

	const addSet = useCallback(
		async (
			exerciseId: string,
			reps: number,
			weight: number,
			weightUnit: string,
		) => {
			if (!workout) return;

			const newSet: StoredSet = {
				id: generateId(),
				reps,
				weight,
				weightUnit,
				createdAt: new Date().toISOString(),
			};

			const updated = {
				...workout,
				exercises: workout.exercises.map((e) =>
					e.exerciseId === exerciseId ? { ...e, sets: [...e.sets, newSet] } : e,
				),
			};
			await saveWorkout(updated);
		},
		[workout, saveWorkout],
	);

	const updateSet = useCallback(
		async (exerciseId: string, setId: string, updates: Partial<StoredSet>) => {
			if (!workout) return;

			const updated = {
				...workout,
				exercises: workout.exercises.map((e) =>
					e.exerciseId === exerciseId
						? {
								...e,
								sets: e.sets.map((s) =>
									s.id === setId ? { ...s, ...updates } : s,
								),
							}
						: e,
				),
			};
			await saveWorkout(updated);
		},
		[workout, saveWorkout],
	);

	const removeSet = useCallback(
		async (exerciseId: string, setId: string) => {
			if (!workout) return;

			const updated = {
				...workout,
				exercises: workout.exercises.map((e) =>
					e.exerciseId === exerciseId
						? { ...e, sets: e.sets.filter((s) => s.id !== setId) }
						: e,
				),
			};
			await saveWorkout(updated);
		},
		[workout, saveWorkout],
	);

	const finishWorkout = useCallback(
		async (name?: string, gymLocation?: string): Promise<StoredWorkout> => {
			if (!workout) throw new Error("No active workout");

			const finishedWorkout: StoredWorkout = {
				...workout,
				name,
				gymLocation,
			};

			// Save previous sets for each exercise
			for (const exercise of finishedWorkout.exercises) {
				await updatePreviousSets(
					exercise.exerciseId,
					exercise.profileId ?? null,
					exercise.sets,
				);
			}

			// Mark as pending sync
			await setPendingWorkout(finishedWorkout);
			await setCurrentWorkout(null);
			setWorkout(null);
			setHasPendingWorkout(true);

			return finishedWorkout;
		},
		[workout],
	);

	const cancelWorkout = useCallback(async () => {
		await setCurrentWorkout(null);
		setWorkout(null);
	}, []);

	return (
		<WorkoutContext.Provider
			value={{
				workout,
				isActive: workout !== null,
				startWorkout,
				logRestDay,
				addExercise,
				removeExercise,
				reorderExercises,
				addSet,
				updateSet,
				removeSet,
				finishWorkout,
				cancelWorkout,
				hasPendingWorkout,
			}}
		>
			{children}
		</WorkoutContext.Provider>
	);
}

export function useWorkout() {
	const context = useContext(WorkoutContext);
	if (!context) {
		throw new Error("useWorkout must be used within a WorkoutProvider");
	}
	return context;
}
