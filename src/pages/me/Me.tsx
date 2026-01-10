import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Me.css";

export default function Me() {
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
				<ExploreContainer name="Me page" />
			</IonContent>
		</IonPage>
	);
}
