// TASK API Methorlarını yöntelim.

import { AxiosHeaders } from 'axios';
import HttpClient, { IHttpClient } from './httpClient';

export interface Ticket {
	id: string;
	description: string;
	employeeName: string;
	workingHour: number;
	startDate: Date;
	endDate: Date;
}

export interface ITicketClient {
	getTickets(): Promise<Ticket[]>;
	getTicketsByCustomer(id: string): Promise<Ticket[]>;
}

export class TicketClient implements ITicketClient {
	httpClient!: HttpClient;
	private endpoint: string = 'api/tickets';

	constructor() {
		this.httpClient = new HttpClient({
			baseUrl: 'https://localhost:7044/',
			headers: new AxiosHeaders().set('Content-Type', 'application/json'),
		});
	}

	getTickets(): Promise<Ticket[]> {
		return this.httpClient.get(this.endpoint, {
			Authorization: 'Bearer xdsadsad',
		});
	}
	getTicketsByCustomer(id: string): Promise<Ticket[]> {
		// api/tickets?employeeId=1
		return this.httpClient.get(`${this.endpoint}?employeeId=${id}`);
	}
}
