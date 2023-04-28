import jwt_decode from 'jwt-decode';

export class LocalStorageService {
	public static getAccessToken(): string | null {
		return localStorage.getItem('accessToken') || null;
	}

	public static removeTokens(): void {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('userInfo');
	}

	public static getRefreshToken(): string | null {
		return localStorage.getItem('refreshToken') || null;
	}

	public static setAccessToken(accessToken: string): void {
		var decoded = jwt_decode(accessToken);
		localStorage.setItem('userInfo', JSON.stringify(decoded));

		return localStorage.setItem('accessToken', accessToken);
	}

	public static setRefreshToken(refreshToken: string): void {
		return localStorage.setItem('refreshToken', refreshToken);
	}

	public static getUserInfo(): any {
		if (localStorage.getItem('userInfo') != undefined) {
			return JSON.parse(localStorage.getItem('userInfo') as string);
		}

		return null;
	}

	public static getEmail(): string {
		const userInfo = this.getUserInfo();
		console.log('userInfo', userInfo);

		if (userInfo != null) {
			const email = userInfo?.email;
			return email;
		}

		return 'Guest';
	}
}
