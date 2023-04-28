import React, { useEffect, useState } from 'react';
import TicketCard from '../../components/TicketCard';
import { Col, Row } from 'react-bootstrap';
import EmployeeSelector from '../../components/EmployeeSelector';

import { hashQueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import { Employee, EmployeeClient } from '../../network/employeeClient';
import { Ticket, TicketClient } from '../../network/taskClient';
import { useTranslation } from 'react-i18next';

function HomePage() {
	const { t, i18n } = useTranslation();
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

	// getTickets function state bağladık, empId key değişince yeniden refetch etti,
	function getTickets() {
		const result = useQuery({
			queryKey: ['ticket', empId],
			queryFn: async () => {
				if (empId === 'tümü') {
					return await ticketClient.getTickets();
				} else {
					return await ticketClient.getTicketsByCustomer(empId);
				}
			},
			onSuccess: (data: Ticket[]) => {
				setTickets(data);
			},
			onError: (error: any) => {
				console.log('ticket-error', error);
			},
		}); // veri employee query üzerinden çalıştırıldığı için setState demeye gerek kalmadı.

		return result;
	}

	const employeeResult = getAllEmployees();
	let ticketResult = getTickets();

	const employeSelect = async (selection: string) => {
		// state state değiştirik emp State değişiminde getTickets function çalıştı
		setEmpId(selection);
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
