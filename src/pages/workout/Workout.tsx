import {
	IonAlert,
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
import { bed, checkmark, close, reorderFour } from "ionicons/icons";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Workout.css";
import { useSync } from "../../hooks/useSync";
import { useWorkout } from "../../hooks/useWorkout";
import AddExerciseSlide from "./components/AddExerciseSlide";
import ExerciseSlide from "./components/ExerciseSlide";
import ReorderModal from "./components/ReorderModal";
import WorkoutSummary from "./components/WorkoutSummary";

function WorkoutContent() {
	const {
		workout,
		isActive,
		startWorkout,
		logRestDay,
		finishWorkout,
		cancelWorkout,
	} = useWorkout();
	const { forceSync } = useSync();
	const [showSummary, setShowSummary] = useState(false);
	const [showReorder, setShowReorder] = useState(false);
	const [showCancelAlert, setShowCancelAlert] = useState(false);
	const swiperRef = useRef<SwiperType | null>(null);

	const handleFinish = useCallback(() => {
		setShowSummary(true);
	}, []);

	const handleSave = useCallback(
		async (name?: string, gymLocation?: string) => {
			await finishWorkout(name, gymLocation);
			setShowSummary(false);
			// Attempt to sync immediately after saving
			forceSync();
		},
		[finishWorkout, forceSync],
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

	const handleLogRestDay = useCallback(async () => {
		await logRestDay();
		// Attempt to sync immediately
		forceSync();
	}, [logRestDay, forceSync]);

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
						<IonButton
							expand="block"
							fill="outline"
							color="medium"
							onClick={handleLogRestDay}
							className="rest-day-button"
						>
							<IonIcon slot="start" icon={bed} />
							Log Rest Day
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
						<IonButton onClick={() => setShowCancelAlert(true)} color="danger">
							<IonIcon slot="icon-only" icon={close} />
						</IonButton>
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
					modules={[Pagination]}
					pagination={{ clickable: true }}
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

			{showCancelAlert && (
				<IonAlert
					isOpen={showCancelAlert}
					onDidDismiss={() => setShowCancelAlert(false)}
					header="Cancel Workout"
					message="Are you sure you want to cancel this workout? All progress will be lost."
					buttons={[
						{
							text: "No, Keep Going",
							role: "cancel",
						},
						{
							text: "Yes, Cancel",
							role: "destructive",
							handler: () => {
								cancelWorkout();
							},
						},
					]}
				/>
			)}
		</IonPage>
	);
}

export default function Workout() {
	return <WorkoutContent />;
}
