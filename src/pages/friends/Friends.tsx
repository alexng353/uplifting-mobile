import {
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonModal,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { personAdd, search } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import "./Friends.css";
import { api } from "../../lib/api";
import type { FeedItem } from "../../lib/api-openapi-gen";
import FriendSearch from "./components/FriendSearch";

export default function Friends() {
	const [feed, setFeed] = useState<FeedItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showSearch, setShowSearch] = useState(false);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	const loadFeed = useCallback(
		async (reset = false) => {
			const newOffset = reset ? 0 : offset;
			const { data, error } = await api.getFeed({
				query: { offset: newOffset, limit: 20 },
			});

			if (error || !data) {
				setIsLoading(false);
				return;
			}

			if (reset) {
				setFeed(data);
			} else {
				setFeed((prev) => [...prev, ...data]);
			}

			setOffset(newOffset + data.length);
			setHasMore(data.length === 20);
			setIsLoading(false);
		},
		[offset],
	);

	useEffect(() => {
		loadFeed(true);
	}, [loadFeed]);

	const handleRefresh = useCallback(
		async (event: CustomEvent) => {
			await loadFeed(true);
			event.detail.complete();
		},
		[loadFeed],
	);

	const handleInfinite = useCallback(
		async (event: CustomEvent) => {
			await loadFeed();
			(event.target as HTMLIonInfiniteScrollElement).complete();
		},
		[loadFeed],
	);

	const formatDuration = (minutes: number | null | undefined): string => {
		if (!minutes) return "";
		if (minutes < 60) return `${minutes}min`;
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours}h ${mins}min`;
	};

	const formatVolume = (volume: string | null | undefined): string => {
		if (!volume) return "";
		const num = Number(volume);
		if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
		return String(Math.round(num));
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Friends</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setShowSearch(true)}>
							<IonIcon slot="icon-only" icon={search} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Friends</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
					<IonRefresherContent />
				</IonRefresher>

				{isLoading ? (
					<div className="loading-container">
						<p>Loading feed...</p>
					</div>
				) : feed.length === 0 ? (
					<div className="empty-feed">
						<h3>No workouts yet</h3>
						<p>Add friends to see their workouts here</p>
						<IonButton onClick={() => setShowSearch(true)}>
							<IonIcon slot="start" icon={personAdd} />
							Find Friends
						</IonButton>
					</div>
				) : (
					<div className="feed-container">
						{feed.map((item) => (
							<IonCard key={item.workout_id}>
								<IonCardHeader>
									<IonCardSubtitle>
										{item.real_name} (@{item.username})
									</IonCardSubtitle>
									<IonCardTitle>{item.workout_name || "Workout"}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<div className="feed-stats">
										{item.duration_minutes && (
											<span>{formatDuration(item.duration_minutes)}</span>
										)}
										{item.total_volume && (
											<span>{formatVolume(item.total_volume)} vol</span>
										)}
										{item.total_sets && <span>{item.total_sets} sets</span>}
									</div>
									{item.gym_location && (
										<p className="gym-location">📍 {item.gym_location}</p>
									)}
									<p className="feed-time">
										{new Date(item.start_time).toLocaleDateString()}
									</p>
								</IonCardContent>
							</IonCard>
						))}
					</div>
				)}

				<IonInfiniteScroll onIonInfinite={handleInfinite} disabled={!hasMore}>
					<IonInfiniteScrollContent />
				</IonInfiniteScroll>

				<IonFab slot="fixed" vertical="bottom" horizontal="end">
					<IonFabButton onClick={() => setShowSearch(true)}>
						<IonIcon icon={personAdd} />
					</IonFabButton>
				</IonFab>

				<IonModal isOpen={showSearch} onDidDismiss={() => setShowSearch(false)}>
					<FriendSearch onClose={() => setShowSearch(false)} />
				</IonModal>
			</IonContent>
		</IonPage>
	);
}
