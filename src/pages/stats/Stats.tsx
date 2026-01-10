import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Stats.css";

export default function Stats() {
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
				<ExploreContainer name="Stats page" />
			</IonContent>
		</IonPage>
	);
}
