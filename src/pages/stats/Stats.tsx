import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import "./Stats.css";
import { api } from "../../lib/api";
import type { Workout } from "../../lib/api-openapi-gen";

interface WeekStats {
	totalWorkouts: number;
	totalSets: number;
	totalVolume: number;
	totalMinutes: number;
}

export default function Stats() {
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [weekStats, setWeekStats] = useState<WeekStats>({
		totalWorkouts: 0,
		totalSets: 0,
		totalVolume: 0,
		totalMinutes: 0,
	});
	const [isLoading, setIsLoading] = useState(true);

	const loadStats = useCallback(async () => {
		setIsLoading(true);

		// Get recent workouts
		const { data: workoutData } = await api.listWorkouts({
			query: { page: 1, per_page: 10 },
		});

		if (workoutData?.workouts) {
			setWorkouts(workoutData.workouts);

			// Calculate this week's stats (Sunday to Saturday)
			const now = new Date();
			const dayOfWeek = now.getDay();
			const startOfWeek = new Date(now);
			startOfWeek.setDate(now.getDate() - dayOfWeek);
			startOfWeek.setHours(0, 0, 0, 0);

			let totalWorkouts = 0;
			let totalMinutes = 0;

			// Get summaries for workouts this week
			const thisWeekWorkouts = workoutData.workouts.filter((w) => {
				const workoutDate = new Date(w.start_time);
				return workoutDate >= startOfWeek;
			});

			totalWorkouts = thisWeekWorkouts.length;

			// Calculate duration for each
			for (const w of thisWeekWorkouts) {
				if (w.start_time && w.end_time) {
					const start = new Date(w.start_time);
					const end = new Date(w.end_time);
					totalMinutes += Math.round((end.getTime() - start.getTime()) / 60000);
				}
			}

			setWeekStats({
				totalWorkouts,
				totalSets: 0, // Would need to fetch summaries for this
				totalVolume: 0,
				totalMinutes,
			});
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		loadStats();
	}, [loadStats]);

	const handleRefresh = useCallback(
		async (event: CustomEvent) => {
			await loadStats();
			event.detail.complete();
		},
		[loadStats],
	);

	const formatDate = (date: string): string => {
		return new Date(date).toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	};

	const formatDuration = (start: string, end: string | null): string => {
		if (!end) return "In progress";
		const startDate = new Date(start);
		const endDate = new Date(end);
		const mins = Math.round((endDate.getTime() - startDate.getTime()) / 60000);
		return `${mins} min`;
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Stats</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Stats</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
					<IonRefresherContent />
				</IonRefresher>

				<div className="stats-content">
					<IonCard>
						<IonCardHeader>
							<IonCardTitle>This Week</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							<div className="week-stats">
								<div className="stat-item">
									<span className="stat-value">{weekStats.totalWorkouts}</span>
									<span className="stat-label">Workouts</span>
								</div>
								<div className="stat-item">
									<span className="stat-value">{weekStats.totalMinutes}</span>
									<span className="stat-label">Minutes</span>
								</div>
							</div>
						</IonCardContent>
					</IonCard>

					<h3 className="section-title">Recent Workouts</h3>

					{isLoading ? (
						<p className="ion-text-center">Loading...</p>
					) : workouts.length === 0 ? (
						<div className="empty-state">
							<p>No workouts yet</p>
							<p>Complete your first workout to see stats</p>
						</div>
					) : (
						<IonList>
							{workouts.map((workout) => (
								<IonItem key={workout.id} button detail>
									<IonLabel>
										<h2>{workout.name || "Workout"}</h2>
										<p>{formatDate(workout.start_time)}</p>
									</IonLabel>
									<span slot="end" className="workout-duration">
										{formatDuration(workout.start_time, workout.end_time)}
									</span>
								</IonItem>
							))}
						</IonList>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
}
