import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonModal,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { checkmark, reorderFour } from "ionicons/icons";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Workout.css";
import { useWorkout, WorkoutProvider } from "../../hooks/useWorkout";
import AddExerciseSlide from "./components/AddExerciseSlide";
import ExerciseSlide from "./components/ExerciseSlide";
import ReorderModal from "./components/ReorderModal";
import WorkoutSummary from "./components/WorkoutSummary";

function WorkoutContent() {
	const { workout, isActive, startWorkout, finishWorkout } = useWorkout();
	const [showSummary, setShowSummary] = useState(false);
	const [showReorder, setShowReorder] = useState(false);
	const swiperRef = useRef<SwiperType | null>(null);

	const handleFinish = useCallback(() => {
		setShowSummary(true);
	}, []);

	const handleSave = useCallback(
		async (name?: string, gymLocation?: string) => {
			await finishWorkout(name, gymLocation);
			setShowSummary(false);
		},
		[finishWorkout],
	);

	const handleCancel = useCallback(() => {
		setShowSummary(false);
	}, []);

	const handleExerciseAdded = useCallback(() => {
		// Slide to the newly added exercise (second to last slide)
		if (swiperRef.current && workout) {
			swiperRef.current.slideTo(workout.exercises.length - 1);
		}
	}, [workout]);

	if (!isActive) {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Workout</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent className="ion-padding" fullscreen>
					<div className="start-workout-container">
						<h2>Ready to train?</h2>
						<p>Start a new workout session to begin logging your exercises.</p>
						<IonButton expand="block" onClick={startWorkout}>
							Start Workout
						</IonButton>
					</div>
				</IonContent>
			</IonPage>
		);
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Workout</IonTitle>
					<IonButtons slot="start">
						<IonButton onClick={() => setShowReorder(true)}>
							<IonIcon slot="icon-only" icon={reorderFour} />
						</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={handleFinish} color="success">
							<IonIcon slot="icon-only" icon={checkmark} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<Swiper
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					spaceBetween={0}
					slidesPerView={1}
					className="workout-swiper"
				>
					{workout?.exercises.map((exercise) => (
						<SwiperSlide key={exercise.exerciseId}>
							<ExerciseSlide exercise={exercise} />
						</SwiperSlide>
					))}
					<SwiperSlide>
						<AddExerciseSlide onExerciseAdded={handleExerciseAdded} />
					</SwiperSlide>
				</Swiper>
			</IonContent>

			{workout && (
				<IonModal isOpen={showSummary} onDidDismiss={handleCancel}>
					<WorkoutSummary
						workout={workout}
						onSave={handleSave}
						onCancel={handleCancel}
					/>
				</IonModal>
			)}

			<IonModal isOpen={showReorder} onDidDismiss={() => setShowReorder(false)}>
				<ReorderModal onClose={() => setShowReorder(false)} />
			</IonModal>
		</IonPage>
	);
}

export default function Workout() {
	return (
		<WorkoutProvider>
			<WorkoutContent />
		</WorkoutProvider>
	);
}
