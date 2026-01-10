import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Workout.css";

export default function Workout() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Workout</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Workout</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer name="Workout page" />
			</IonContent>
		</IonPage>
	);
}
