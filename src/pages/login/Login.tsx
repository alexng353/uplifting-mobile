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

export default function Login() {
	const [isRegistering, setIsRegistering] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [realName, setRealName] = useState("");
	const [email, setEmail] = useState("");

	const title = isRegistering ? "Register" : "Login";

	const handleLogin = useCallback(() => {
		console.log("login", username, password);
	}, [username, password]);

	const handleRegister = useCallback(() => {
		console.log("register", username, password, realName, email);
	}, [username, password, realName, email]);

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
