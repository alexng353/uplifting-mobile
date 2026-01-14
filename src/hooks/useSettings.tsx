import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import {
	convertWeight,
	DEFAULT_SETTINGS,
	getSettings,
	type StoredSettings,
	setSettings as saveSettings,
} from "../services/local-storage";
import { useAuth } from "./useAuth";

export function useSettings() {
	const { isAuthenticated } = useAuth();
	const [settings, setSettingsState] =
		useState<StoredSettings>(DEFAULT_SETTINGS);
	const [isLoading, setIsLoading] = useState(true);

	// Load settings from local storage on mount
	useEffect(() => {
		getSettings().then((stored) => {
			setSettingsState(stored);
			setIsLoading(false);
		});
	}, []);

	// Sync with server when authenticated
	useEffect(() => {
		if (!isAuthenticated) return;

		api.getSettings().then(({ data, error }) => {
			if (error || !data) return;
			const serverSettings: StoredSettings = {
				displayUnit: data.display_unit as "kg" | "lbs" | null,
				maxWorkoutDurationMinutes: data.max_workout_duration_minutes,
				defaultRestTimerSeconds: data.default_rest_timer_seconds,
				defaultPrivacy: data.default_privacy,
				shareGymLocation: data.share_gym_location,
			};
			setSettingsState(serverSettings);
			saveSettings(serverSettings);
		});
	}, [isAuthenticated]);

	const updateSettings = useCallback(
		async (updates: Partial<StoredSettings>) => {
			const newSettings = { ...settings, ...updates };
			setSettingsState(newSettings);
			await saveSettings(newSettings);

			// Sync to server if online
			if (isAuthenticated) {
				api.updateSettings({
					body: {
						display_unit: newSettings.displayUnit,
						max_workout_duration_minutes: newSettings.maxWorkoutDurationMinutes,
						default_rest_timer_seconds: newSettings.defaultRestTimerSeconds,
						default_privacy: newSettings.defaultPrivacy,
						share_gym_location: newSettings.shareGymLocation,
					},
				});
			}
		},
		[settings, isAuthenticated],
	);

	// Get display unit (auto-detect from locale if not set)
	const getDisplayUnit = useCallback((): "kg" | "lbs" => {
		if (settings.displayUnit) return settings.displayUnit;
		// Auto-detect: US uses lbs, rest of world uses kg
		const locale = navigator.language;
		return locale.startsWith("en-US") ? "lbs" : "kg";
	}, [settings.displayUnit]);

	// Format weight for display
	const formatWeight = useCallback(
		(weight: number, unit: string): string => {
			const displayUnit = getDisplayUnit();
			const converted = convertWeight(weight, unit, displayUnit);
			return `${converted} ${displayUnit}`;
		},
		[getDisplayUnit],
	);

	return {
		settings,
		isLoading,
		updateSettings,
		getDisplayUnit,
		formatWeight,
	};
}
