import React, { useEffect, useState } from 'react';
import TicketCard from '../../components/TicketCard';
import { Col, Row } from 'react-bootstrap';
import EmployeeSelector from '../../components/EmployeeSelector';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Employee, EmployeeClient } from '../../network/employeeClient';
import { Ticket, TicketClient } from '../../network/taskClient';

function HomePage() {
	const queryClient = useQueryClient();

	const [empoloyees, setEmployees] = useState<Employee[]>([]);
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [empId, setEmpId] = useState<string>('tümü');

	const employeeClient = new EmployeeClient();
	const ticketClient = new TicketClient();

	// not hooklar sadece function body den çağırılabilir.
	// not query sadece sayfa load olurken kullanabiliriz.

	function getAllEmployees() {
		return useQuery({
			queryKey: ['employee-list'], // eğer employee apidan bir veri ekleme işlemi gerçekleşirse
			queryFn: async () => await employeeClient.getEmployees(),
			onSuccess: (data: Employee[]) => {
				setEmployees(data);
			},
			onError: (error: any) => {
				console.log('emp-error', error);
			},
		}); // veri employee query üzerinden çalıştırıldığı için setState demeye gerek kalmadı.
	}

	function getAllTickets() {
		const result = useQuery({
			queryKey: ['ticket-list'], // eğer employee apidan bir veri ekleme işlemi gerçekleşirse
			queryFn: async () => await ticketClient.getTickets(),
			onSuccess: (data: Ticket[]) => {
				setTickets(data);
			},
			onError: (error: any) => {
				console.log('ticket-error', error);
			},
		}); // veri employee query üzerinden çalıştırıldığı için setState demeye gerek kalmadı.

		return result;
	}

	// sayfa componentlerinde sayfaya yapılan isteği useQuery bağlayabiliriz ama bir method içerisinde değişen değere göre çağıramayız.
	function getTicketsById(id: string) {
		const result = useQuery({
			queryKey: ['tickets-by-employee', id],
			queryFn: async () => await ticketClient.getTicketsByCustomer(id),
			onSuccess: (data: Ticket[]) => {
				console.log('ticket-data', data);
				setTickets(data);
			},
			onError: (error: any) => {
				console.log('ticket-error', error);
			},
		}); // veri employee query üzerinden çalıştırıldığı için setState demeye gerek kalmadı.
	}

	const employeeResult = getAllEmployees();
	let ticketResult = getAllTickets();

	const employeSelect = async (selection: string) => {
		// method içinde hook çağıramayız
		// getTicketsById(empId);
		// hooklar sadece method içerisinde çağırılabilir

		if (selection === 'tümü') {
			setTickets(await ticketClient.getTickets());
		} else {
			setTickets(await ticketClient.getTicketsByCustomer(selection));
		}
	};

	return (
		<div>
			<Row>
				<Col>
					{employeeResult.isFetched && employeeResult.isSuccess ? (
						<EmployeeSelector
							onSelected={async (selection: string) =>
								employeSelect(selection)
							}
							employees={empoloyees}
						/>
					) : (
						<></>
					)}
				</Col>
			</Row>
			<Row>
				<Col>
					{ticketResult.isSuccess ? (
						<TicketCard tickets={tickets} />
					) : (
						<></>
					)}
				</Col>
			</Row>
		</div>
	);
}

export default HomePage;
