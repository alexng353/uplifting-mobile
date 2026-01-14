import {
	IonButton,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonSearchbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useWorkout } from "../../../hooks/useWorkout";
import { api } from "../../../lib/api";
import type { Exercise } from "../../../lib/api-openapi-gen";

interface AddExerciseSlideProps {
	onExerciseAdded: () => void;
}

export default function AddExerciseSlide({
	onExerciseAdded,
}: AddExerciseSlideProps) {
	const { addExercise } = useWorkout();
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		api
			.listExercises({ query: { search: searchText || undefined } })
			.then(({ data }) => {
				if (data?.exercises) {
					setExercises(data.exercises);
				}
				setIsLoading(false);
			});
	}, [searchText]);

	const handleQuickAdd = useCallback(
		(exercise: Exercise) => {
			addExercise(exercise.id, exercise.name);
			onExerciseAdded();
		},
		[addExercise, onExerciseAdded],
	);

	// Group exercises by first letter
	const groupedExercises = exercises.reduce(
		(acc, exercise) => {
			const letter = exercise.name[0].toUpperCase();
			if (!acc[letter]) {
				acc[letter] = [];
			}
			acc[letter].push(exercise);
			return acc;
		},
		{} as Record<string, Exercise[]>,
	);

	const sortedLetters = Object.keys(groupedExercises).sort();

	return (
		<div className="add-exercise-slide">
			<h2>Add Exercise</h2>

			<IonSearchbar
				value={searchText}
				onIonInput={(e) => setSearchText(e.detail.value ?? "")}
				placeholder="Search exercises..."
				debounce={300}
			/>

			<div className="exercise-list-container">
				{isLoading ? (
					<p>Loading exercises...</p>
				) : exercises.length === 0 ? (
					<p>No exercises found</p>
				) : (
					sortedLetters.map((letter) => (
						<div key={letter}>
							<h3 className="ion-padding-start">{letter}</h3>
							<IonList>
								{groupedExercises[letter].map((exercise) => (
									<IonItem key={exercise.id} button>
										<IonLabel>
											<h3>{exercise.name}</h3>
											<p>{exercise.exercise_type}</p>
										</IonLabel>
										<IonButton
											slot="end"
											fill="clear"
											onClick={(e) => {
												e.stopPropagation();
												handleQuickAdd(exercise);
											}}
										>
											<IonIcon slot="icon-only" icon={add} />
										</IonButton>
									</IonItem>
								))}
							</IonList>
						</div>
					))
				)}
			</div>
		</div>
	);
}
