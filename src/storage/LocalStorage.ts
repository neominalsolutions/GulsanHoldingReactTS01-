export class LocalStorageService {
	public static getAccessToken(): string | null {
		return localStorage.getItem('accessToken') || null;
	}

	public static getRefreshToken(): string | null {
		return localStorage.getItem('refreshToken') || null;
	}

	public static setAccessToken(accessToken: string): void {
		return localStorage.setItem('accessToken', accessToken);
	}

	public static setRefreshToken(refreshToken: string): void {
		return localStorage.setItem('refreshToken', refreshToken);
	}
}
