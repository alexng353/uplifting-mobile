import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Settings.css";
import { useAuth } from "../../hooks/useAuth";

export default function Settings() {
	const { logout } = useAuth();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Settings</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Settings</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer name="Settings page" />
				<IonButton onClick={logout}>Logout</IonButton>
			</IonContent>
		</IonPage>
	);
}
