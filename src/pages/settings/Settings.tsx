import {
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToggle,
	IonToolbar,
} from "@ionic/react";
import { logOut, personCircle, trash } from "ionicons/icons";
import { useCallback } from "react";
import "./Settings.css";
import { useAuth } from "../../hooks/useAuth";
import { useMe } from "../../hooks/useMe";
import { useSettings } from "../../hooks/useSettings";
import { clearAllData } from "../../services/local-storage";

export default function Settings() {
	const { logout, isAuthenticated } = useAuth();
	const { settings, updateSettings } = useSettings();
	const { data: user } = useMe(isAuthenticated);

	const handleLogout = useCallback(async () => {
		await clearAllData();
		logout();
	}, [logout]);

	const handleDeleteAccount = useCallback(async () => {
		// TODO: Add confirmation dialog
		// await api.deleteMe();
		// await clearAllData();
		// logout();
	}, []);

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

				{user && (
					<div className="profile-section">
						<IonIcon icon={personCircle} className="profile-icon" />
						<h2>{user.real_name}</h2>
						<p>@{user.username}</p>
					</div>
				)}

				<IonList inset>
					<IonListHeader>Preferences</IonListHeader>

					<IonItem>
						<IonLabel>Weight Unit</IonLabel>
						<IonSelect
							value={settings.displayUnit}
							onIonChange={(e) =>
								updateSettings({ displayUnit: e.detail.value })
							}
							interface="popover"
						>
							<IonSelectOption value={null}>Auto (locale)</IonSelectOption>
							<IonSelectOption value="kg">Kilograms (kg)</IonSelectOption>
							<IonSelectOption value="lbs">Pounds (lbs)</IonSelectOption>
						</IonSelect>
					</IonItem>

					<IonItem>
						<IonLabel>Default Privacy</IonLabel>
						<IonSelect
							value={settings.defaultPrivacy}
							onIonChange={(e) =>
								updateSettings({ defaultPrivacy: e.detail.value })
							}
							interface="popover"
						>
							<IonSelectOption value="public">Public</IonSelectOption>
							<IonSelectOption value="friends">Friends Only</IonSelectOption>
							<IonSelectOption value="private">Private</IonSelectOption>
						</IonSelect>
					</IonItem>

					<IonItem>
						<IonLabel>Rest Timer (seconds)</IonLabel>
						<IonSelect
							value={settings.defaultRestTimerSeconds}
							onIonChange={(e) =>
								updateSettings({
									defaultRestTimerSeconds: Number(e.detail.value),
								})
							}
							interface="popover"
						>
							<IonSelectOption value={30}>30</IonSelectOption>
							<IonSelectOption value={60}>60</IonSelectOption>
							<IonSelectOption value={90}>90</IonSelectOption>
							<IonSelectOption value={120}>120</IonSelectOption>
							<IonSelectOption value={180}>180</IonSelectOption>
						</IonSelect>
					</IonItem>

					<IonItem>
						<IonLabel>Max Workout Duration (min)</IonLabel>
						<IonSelect
							value={settings.maxWorkoutDurationMinutes}
							onIonChange={(e) =>
								updateSettings({
									maxWorkoutDurationMinutes: Number(e.detail.value),
								})
							}
							interface="popover"
						>
							<IonSelectOption value={60}>60</IonSelectOption>
							<IonSelectOption value={90}>90</IonSelectOption>
							<IonSelectOption value={120}>120</IonSelectOption>
							<IonSelectOption value={180}>180</IonSelectOption>
							<IonSelectOption value={240}>240</IonSelectOption>
						</IonSelect>
					</IonItem>

					<IonItem>
						<IonLabel>Share Gym Location</IonLabel>
						<IonToggle
							checked={settings.shareGymLocation}
							onIonChange={(e) =>
								updateSettings({ shareGymLocation: e.detail.checked })
							}
						/>
					</IonItem>
				</IonList>

				<IonList inset>
					<IonListHeader>Account</IonListHeader>

					<IonItem button onClick={handleLogout} detail={false}>
						<IonIcon slot="start" icon={logOut} color="primary" />
						<IonLabel color="primary">Log Out</IonLabel>
					</IonItem>

					<IonItem button onClick={handleDeleteAccount} detail={false}>
						<IonIcon slot="start" icon={trash} color="danger" />
						<IonLabel color="danger">Delete Account</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
}
