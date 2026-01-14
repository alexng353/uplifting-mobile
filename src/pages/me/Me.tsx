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
import { useState } from "react";
import "./Me.css";
import { useSync } from "../../hooks/useSync";

export default function Me() {
	const { isOnline, hasPendingWorkout, isSyncing, lastSyncTime, forceSync } =
		useSync();
	const [view, setView] = useState<"front" | "back">("front");

	// TODO: Calculate actual muscle coverage from workouts
	const musclePercentage = 65;

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
						{/* Placeholder for muscle chart */}
						<div className="muscle-chart-placeholder">
							<p>Muscle Chart</p>
							<p className="muscle-chart-view">
								{view === "front" ? "Front View" : "Back View"}
							</p>
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
