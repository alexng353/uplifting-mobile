import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useCallback, useState } from "react";
import "./Login.css";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/api";

export default function Login() {
	const { login } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [realName, setRealName] = useState("");
	const [email, setEmail] = useState("");

	const title = isRegistering ? "Register" : "Login";

	const handleLogin = useCallback(async () => {
		const { data, error } = await api.login({
			body: {
				username,
				password,
			},
		});
		if (error || !data) {
			console.error("Failed to login", error);
			return;
		}
		await login(data);
	}, [username, password, login]);

	const handleRegister = useCallback(async () => {
		const { data, error } = await api.signup({
			body: {
				username,
				password,
				real_name: realName,
				email,
			},
		});
		if (error || !data) {
			console.error("Failed to register", error);
			return;
		}
		await login(data);
	}, [username, password, realName, email, login]);

	const handleClick = useCallback(() => {
		if (isRegistering) {
			handleRegister();
		} else {
			handleLogin();
		}
	}, [isRegistering, handleLogin, handleRegister]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{title}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">{title}</IonTitle>
					</IonToolbar>
				</IonHeader>
				<div className="login-container">
					<div className="login-form">
						{isRegistering && (
							<>
								<IonInput
									type="text"
									placeholder="Full Name"
									value={realName}
									onIonInput={(e) => setRealName(e.detail.value ?? "")}
								/>
								<IonInput
									type="email"
									placeholder="Email"
									value={email}
									onIonInput={(e) => setEmail(e.detail.value ?? "")}
								/>
							</>
						)}
						<IonInput
							type="text"
							placeholder="Username"
							value={username}
							onIonInput={(e) => setUsername(e.detail.value ?? "")}
						/>
						<IonInput
							type="password"
							placeholder="Password"
							value={password}
							onIonInput={(e) => setPassword(e.detail.value ?? "")}
						/>
						<div className="login-form-buttons">
							<IonButton onClick={handleClick} expand="block">
								{isRegistering ? "Register" : "Login"}
							</IonButton>
						</div>
						<div className="login-toggle">
							<IonText color="medium">
								{isRegistering
									? "Already have an account?"
									: "Don't have an account?"}
							</IonText>
							<IonButton
								fill="clear"
								size="small"
								onClick={() => setIsRegistering(!isRegistering)}
							>
								{isRegistering ? "Login" : "Register"}
							</IonButton>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
}
