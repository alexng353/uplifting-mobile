import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { barbell, people, person, settings, statsChart } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

/* Pages */
import Friends from "./pages/friends/Friends";
import Me from "./pages/me/Me";
import Settings from "./pages/settings/Settings";
import Stats from "./pages/stats/Stats";
import Workout from "./pages/workout/Workout";

setupIonicReact();

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route exact path="/me">
						<Me />
					</Route>
					<Route exact path="/friends">
						<Friends />
					</Route>
					<Route exact path="/workout">
						<Workout />
					</Route>
					<Route exact path="/stats">
						<Stats />
					</Route>
					<Route exact path="/settings">
						<Settings />
					</Route>
					<Route exact path="/">
						<Redirect to="/me" />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="me" href="/me">
						<IonIcon aria-hidden="true" icon={person} />
						<IonLabel>Me</IonLabel>
					</IonTabButton>
					<IonTabButton tab="friends" href="/friends">
						<IonIcon aria-hidden="true" icon={people} />
						<IonLabel>Friends</IonLabel>
					</IonTabButton>
					<IonTabButton tab="workout" href="/workout">
						<IonIcon aria-hidden="true" icon={barbell} />
						<IonLabel>Workout</IonLabel>
					</IonTabButton>
					<IonTabButton tab="stats" href="/stats">
						<IonIcon aria-hidden="true" icon={statsChart} />
						<IonLabel>Stats</IonLabel>
					</IonTabButton>
					<IonTabButton tab="settings" href="/settings">
						<IonIcon aria-hidden="true" icon={settings} />
						<IonLabel>Settings</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
