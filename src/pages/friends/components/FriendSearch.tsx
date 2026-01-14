import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonSearchbar,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { personAdd } from "ionicons/icons";
import { useCallback, useState } from "react";
import { api } from "../../../lib/api";
import type { UserSearchResult } from "../../../lib/api-openapi-gen";

interface FriendSearchProps {
	onClose: () => void;
}

export default function FriendSearch({ onClose }: FriendSearchProps) {
	const [searchText, setSearchText] = useState("");
	const [results, setResults] = useState<UserSearchResult[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

	const handleSearch = useCallback(async (query: string) => {
		if (!query.trim()) {
			setResults([]);
			return;
		}

		setIsSearching(true);
		const { data } = await api.searchUsers({ query: { q: query } });
		if (data) {
			setResults(data);
		}
		setIsSearching(false);
	}, []);

	const handleSendRequest = useCallback(async (userId: string) => {
		const { error } = await api.sendRequest({ body: { friend_id: userId } });
		if (!error) {
			setSentRequests((prev) => new Set([...prev, userId]));
		}
	}, []);

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Find Friends</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={onClose}>Done</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonSearchbar
					value={searchText}
					onIonInput={(e) => {
						const value = e.detail.value ?? "";
						setSearchText(value);
						handleSearch(value);
					}}
					placeholder="Search by username..."
					debounce={300}
				/>

				{isSearching ? (
					<p className="ion-text-center">Searching...</p>
				) : results.length === 0 && searchText ? (
					<p className="ion-text-center">No users found</p>
				) : (
					<IonList>
						{results.map((user) => (
							<IonItem key={user.id}>
								<IonLabel>
									<h2>{user.real_name}</h2>
									<p>@{user.username}</p>
								</IonLabel>
								<IonButton
									slot="end"
									fill="clear"
									disabled={sentRequests.has(user.id)}
									onClick={() => handleSendRequest(user.id)}
								>
									{sentRequests.has(user.id) ? (
										"Sent"
									) : (
										<IonIcon slot="icon-only" icon={personAdd} />
									)}
								</IonButton>
							</IonItem>
						))}
					</IonList>
				)}
			</IonContent>
		</>
	);
}
