// HTTP VERB isteklerini merkezi olarak burası yönetsin.

import axios, { AxiosError, AxiosHeaders, AxiosInstance } from 'axios';
import { LocalStorageService } from '../storage/LocalStorage';

export interface ApiConfig {
	baseUrl: string; //  https://localhost:7044/
	headers: AxiosHeaders; // header üzerinden değer göndermek için açtık
}

export interface IHttpClient {
	post<TRequest, TResponse>(
		endpoint: string, // api/tasks
		param: TRequest, // {description:'task-1'}
		headers?: any
	): Promise<TResponse>; // status 200 {id:1,description:'task-1'}

	patch<TRequest, TResponse>(
		endpoint: string,
		param: TRequest,
		headers?: any
	): Promise<TResponse>;

	put<TRequest, TResponse>(
		endpoint: string,
		param: TRequest,
		headers?: any
	): Promise<TResponse>;

	delete<TResponse>(endpoint: string): Promise<TResponse>;

	get<TResponse>(endpoint: string, headers?: any): Promise<TResponse>;
}

export default class HttpClient implements IHttpClient {
	private axios!: AxiosInstance;

	protected createAxiosClient(apiConfig: ApiConfig): AxiosInstance {
		// httpClient Factory
		return axios.create({
			baseURL: apiConfig.baseUrl,
			responseType: 'json',
			headers: apiConfig.headers, // header değerinden isteklerde bir veri header üzerinden gönderilebilir [FromHeader]
			timeout: 5000, // 5 saniye sonuç alamazsak istek timeout düşsün
			timeoutErrorMessage: 'Request Timeout',
		});
	}

	constructor(apiConfig: ApiConfig) {
		this.axios = this.createAxiosClient(apiConfig);
		this.useInteceptors();
	}

	/**
	 * interceptor kullanımı
	 * @returns void
	 */
	private useInteceptors(): void {
		this.axios.interceptors.request.use(
			(response) => {
				// console.log('request-int', response);

				let token = LocalStorageService.getAccessToken();

				if (token != null) {
					console.log('res-header');
					response.headers['Authorization'] = `Bearer ${token}`;
				}

				return response;
			},
			(error) => {
				// console.log('interceptor-error', error);
			}
		);

		this.axios.interceptors.response.use(
			(response) => {
				console.log('response-int', response);
				return response;
			},
			(error: any) => {
				const originalRequest = error.config; // original request

				if (error.response.status === 401) {
					const refreshToken = LocalStorageService.getRefreshToken();
					const accessToken = LocalStorageService.getAccessToken();

					return this.axios
						.post('api/Tokens/refreshToken', {
							AccessToken: accessToken,
							RefreshToken: refreshToken,
						})
						.then((res) => {
							// console.log('refreshToken', res);

							LocalStorageService.setAccessToken(
								res.data.accessToken
							);
							LocalStorageService.setRefreshToken(
								res.data.refreshToken
							);
							axios.defaults.headers.common['Authorization'] =
								'Bearer ' +
								LocalStorageService.getAccessToken();
							return axios(originalRequest);
						});
				}

				return Promise.reject(error);
			}
		);
	}

	async post<TRequest, TResponse>(
		endpoint: string,
		param: TRequest,
		headers?: any
	): Promise<TResponse> {
		try {
			return (
				await this.axios.post<TResponse>(endpoint, param, {
					headers: headers,
				})
			).data;
		} catch (error) {
			console.log('error', error);
			return Promise.reject(error); // Hata durumlarını servis üzerinden yakalamak için Promise.reject(error) kodunu implemente etmediğimizden catch bloguna düşememişiz. burası tüm methodlardan güncelllendi
		}
	}

	async patch<TRequest, TResponse>(
		endpoint: string,
		param: TRequest,
		headers?: any
	): Promise<TResponse> {
		try {
			return (
				await this.axios.patch<TResponse>(endpoint, param, {
					headers: headers,
				})
			).data;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async put<TRequest, TResponse>(
		endpoint: string,
		param: TRequest,
		headers?: any
	): Promise<any> {
		try {
			return (
				await this.axios.put<TResponse>(endpoint, param, {
					headers: headers,
				})
			).data;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async delete<TResponse>(endpoint: string): Promise<TResponse> {
		try {
			return (await this.axios.delete<TResponse>(endpoint)).data;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async get<TResponse>(endpoint: string, headers?: any): Promise<TResponse> {
		try {
			return (
				await this.axios.get<TResponse>(endpoint, { headers: headers })
			).data;
		} catch (error) {
			console.log('get-error', error);
			return Promise.reject(error);
		}
	}
}
