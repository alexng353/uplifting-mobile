import { useCallback, useEffect, useState } from "react";
import {
	clearTokens,
	getAccessToken,
	getRefreshToken,
	saveTokens,
} from "../services/auth-storage";

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	accessToken: string | null;
	refreshToken: string | null;
}

export function useAuth() {
	const [state, setState] = useState<AuthState>({
		isAuthenticated: false,
		isLoading: true,
		accessToken: null,
		refreshToken: null,
	});

	const checkAuth = useCallback(async () => {
		setState((prev) => ({ ...prev, isLoading: true }));
		try {
			const [accessToken, refreshToken] = await Promise.all([
				getAccessToken(),
				getRefreshToken(),
			]);
			setState({
				isAuthenticated: !!accessToken,
				isLoading: false,
				accessToken,
				refreshToken,
			});
		} catch {
			setState({
				isAuthenticated: false,
				isLoading: false,
				accessToken: null,
				refreshToken: null,
			});
		}
	}, []);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	const login = useCallback(
		async (accessToken: string, refreshToken?: string) => {
			await saveTokens(accessToken, refreshToken);
			setState({
				isAuthenticated: true,
				isLoading: false,
				accessToken,
				refreshToken: refreshToken ?? null,
			});
		},
		[],
	);

	const logout = useCallback(async () => {
		await clearTokens();
		setState({
			isAuthenticated: false,
			isLoading: false,
			accessToken: null,
			refreshToken: null,
		});
	}, []);

	return {
		...state,
		login,
		logout,
		checkAuth,
	};
}
