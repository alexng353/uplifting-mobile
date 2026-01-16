import { IonButton, IonIcon, IonInput, IonList } from "@ionic/react";
import { add, arrowDown, close } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useSettings } from "../../../hooks/useSettings";
import { useWorkout } from "../../../hooks/useWorkout";
import type {
	StoredSet,
	StoredWorkoutExercise,
} from "../../../services/local-storage";
import { getPreviousSets } from "../../../services/local-storage";

interface ExerciseSlideProps {
	exercise: StoredWorkoutExercise;
}

export default function ExerciseSlide({ exercise }: ExerciseSlideProps) {
	const { addSet, removeSet, updateSet } = useWorkout();
	const { getDisplayUnit, formatWeight } = useSettings();
	const [previousSets, setPreviousSets] = useState<StoredSet[]>([]);
	const [newReps, setNewReps] = useState<number | undefined>();
	const [newWeight, setNewWeight] = useState<number | undefined>();

	useEffect(() => {
		const key = `${exercise.exerciseId}_${exercise.profileId ?? "default"}`;
		getPreviousSets().then((data) => {
			setPreviousSets(data[key] ?? []);
		});
	}, [exercise.exerciseId, exercise.profileId]);

	const handleAddSet = useCallback(() => {
		const reps = newReps ?? previousSets[exercise.sets.length]?.reps ?? 10;
		const weight =
			newWeight ?? previousSets[exercise.sets.length]?.weight ?? 20;
		const unit = getDisplayUnit();

		addSet(exercise.exerciseId, reps, weight, unit);
		setNewReps(undefined);
		setNewWeight(undefined);
	}, [
		exercise.exerciseId,
		exercise.sets.length,
		newReps,
		newWeight,
		previousSets,
		addSet,
		getDisplayUnit,
	]);

	const handleDelete = useCallback(
		(setId: string) => {
			removeSet(exercise.exerciseId, setId);
		},
		[exercise.exerciseId, removeSet],
	);

	const handleFillFromPrevious = useCallback(
		(setId: string, index: number) => {
			const prev = previousSets[index];
			if (!prev) return;
			updateSet(exercise.exerciseId, setId, {
				reps: prev.reps,
				weight: prev.weight,
				weightUnit: prev.weightUnit,
			});
		},
		[exercise.exerciseId, previousSets, updateSet],
	);

	const getPlaceholder = (index: number, field: "reps" | "weight"): string => {
		const prev = previousSets[index];
		if (!prev) return field === "reps" ? "10" : "20";
		return field === "reps" ? String(prev.reps) : String(prev.weight);
	};

	return (
		<div className="exercise-slide">
			<div className="exercise-slide-header">
				<h2>{exercise.exerciseName}</h2>
				{exercise.profileId && <p>Profile: {exercise.profileId}</p>}
			</div>

			<div className="sets-container">
				<div className="set-row header">
					<div>Set</div>
					<div>Previous</div>
					<div>Reps</div>
					<div>Weight</div>
					<div />
				</div>

				<IonList>
					{exercise.sets.map((set, index) => (
						<div key={set.id} className="set-row">
							<div className="set-number">{index + 1}</div>
							<div className="previous-hint">
								{previousSets[index] ? (
									<IonButton
										fill="clear"
										size="small"
										className="fill-button"
										onClick={() => handleFillFromPrevious(set.id, index)}
									>
										<IonIcon slot="start" icon={arrowDown} />
										{previousSets[index].reps} ×{" "}
										{formatWeight(
											previousSets[index].weight,
											previousSets[index].weightUnit,
										)}
									</IonButton>
								) : (
									"-"
								)}
							</div>
							<IonInput
								type="number"
								value={set.reps}
								onIonChange={(e) =>
									updateSet(exercise.exerciseId, set.id, {
										reps: Number(e.detail.value),
									})
								}
							/>
							<IonInput
								type="number"
								value={set.weight}
								onIonChange={(e) =>
									updateSet(exercise.exerciseId, set.id, {
										weight: Number(e.detail.value),
									})
								}
							/>
							<IonButton
								fill="clear"
								color="danger"
								size="small"
								onClick={() => handleDelete(set.id)}
							>
								<IonIcon slot="icon-only" icon={close} />
							</IonButton>
						</div>
					))}
				</IonList>

				<div className="set-row">
					<div className="set-number">{exercise.sets.length + 1}</div>
					<div className="previous-hint">
						{previousSets[exercise.sets.length]
							? `${previousSets[exercise.sets.length].reps} × ${formatWeight(previousSets[exercise.sets.length].weight, previousSets[exercise.sets.length].weightUnit)}`
							: "-"}
					</div>
					<IonInput
						type="number"
						placeholder={getPlaceholder(exercise.sets.length, "reps")}
						value={newReps}
						onIonChange={(e) =>
							setNewReps(e.detail.value ? Number(e.detail.value) : undefined)
						}
					/>
					<IonInput
						type="number"
						placeholder={getPlaceholder(exercise.sets.length, "weight")}
						value={newWeight}
						onIonChange={(e) =>
							setNewWeight(e.detail.value ? Number(e.detail.value) : undefined)
						}
					/>
					<div>{getDisplayUnit()}</div>
				</div>
			</div>

			<div className="add-set-button-container">
				<IonButton className="add-set-button" onClick={handleAddSet}>
					<IonIcon slot="start" icon={add} />
					Add Set
				</IonButton>
			</div>
		</div>
	);
}
