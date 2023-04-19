export interface LoginModel {
	email: string;
	password: string;
}

export interface TokenModel {
	accessToken: string;
	refreshToken: string;
}

export interface LoginResult {
	isSucceded: boolean;
	errorMessage?: string;
}

import { AxiosHeaders } from 'axios';
import HttpClient, { IHttpClient } from './httpClient';

// apidaki hangi uçlarla haberleşeceğimiz belirledim.
export interface ILoginClient {
	login(param: LoginModel): LoginResult;
}

// httpClient sınıfım üzerinden api isteklerini get,post,put,delete,patch yapacağım bir servis tanımladık.
export class LoginClient implements ILoginClient {
	httpClient!: HttpClient;
	private endpoint: string = 'api/tokens';

	constructor() {
		this.httpClient = new HttpClient({
			baseUrl: 'https://localhost:7044/',
			headers: new AxiosHeaders().set('Content-Type', 'application/json'),
		});
	}

	login = (param: LoginModel) => {
		const fetch = async () => {
			var token: any = await this.httpClient.post(this.endpoint, param);
			localStorage.setItem('accessToken', token.accessToken);
			localStorage.setItem('refreshToken', token.refreshToken);
		};

		try {
			fetch();

			return {
				isSucceded: true,
			} as LoginResult;
		} catch (error: any) {
			console.log('err', error);
			return {
				isSucceded: false,
				errorMessage: error.response.data.errors,
			} as LoginResult;
		}
	};
}
