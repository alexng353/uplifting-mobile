import {
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonSegment,
	IonSegmentButton,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { refresh, warning } from "ionicons/icons";
import { useMemo, useState } from "react";
import {
	calculateMusclePercentage,
	MuscleChart,
	type MuscleStatusMap,
} from "../../components/MuscleChart";
import { useSync } from "../../hooks/useSync";
import "./Me.css";
import { Muscles } from "../../components/MuscleChart/Muscles";

export default function Me() {
	const { isOnline, hasPendingWorkout, isSyncing, lastSyncTime, forceSync } =
		useSync();
	const [view, setView] = useState<"front" | "back">("front");

	// TODO: Compute from actual workout data via API
	// For now, demo data showing some muscles trained
	const trainedMuscles: MuscleStatusMap = useMemo(
		() => ({
			// Primary (directly trained)
			chest: "primary",
			front_delts: "primary",
			quads: "primary",
			glutes: "primary",
			// Secondary (assisted)
			triceps: "secondary",
			abs: "secondary",
			hamstrings: "secondary",
		}),
		[],
	);

	const musclePercentage = calculateMusclePercentage(trainedMuscles);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Me</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Me</IonTitle>
					</IonToolbar>
				</IonHeader>

				{/* Sync Banner */}
				{(!isOnline || hasPendingWorkout) && (
					<div className={`sync-banner ${isOnline ? "pending" : "offline"}`}>
						<div className="sync-banner-content">
							<IonIcon icon={warning} />
							<span>
								{!isOnline ? "You're offline" : "Workout pending sync"}
							</span>
						</div>
						<IonButton
							fill="clear"
							size="small"
							onClick={forceSync}
							disabled={!isOnline || isSyncing}
						>
							<IonIcon slot="start" icon={refresh} />
							{isSyncing ? "Syncing..." : "Sync"}
						</IonButton>
					</div>
				)}

				<div className="me-content">
					<div className="muscle-chart-header">
						<h2>{musclePercentage}% of muscles worked this week</h2>
					</div>

					<IonSegment
						value={view}
						onIonChange={(e) => setView(e.detail.value as "front" | "back")}
					>
						<IonSegmentButton value="front">Front</IonSegmentButton>
						<IonSegmentButton value="back">Back</IonSegmentButton>
					</IonSegment>

					<div className="muscle-chart-container">
						<Muscles />

						<div className="muscle-legend">
							<div className="legend-item">
								<span className="legend-color untrained" />
								<span>Untrained</span>
							</div>
							<div className="legend-item">
								<span className="legend-color secondary" />
								<span>Secondary</span>
							</div>
							<div className="legend-item">
								<span className="legend-color primary" />
								<span>Primary</span>
							</div>
						</div>
					</div>

					{lastSyncTime && (
						<p className="last-sync-time">
							Last synced: {lastSyncTime.toLocaleString()}
						</p>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
}
