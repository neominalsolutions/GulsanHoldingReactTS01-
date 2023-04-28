import React from 'react';
import { Alert, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import { Ticket } from '../network/taskClient';
import moment from 'moment';
import { DateHelper } from '../utils/dateHelper';
import { RootState } from '../slices/Store';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../slices/ticketSlice';

export type TicketCardProps = {
	tickets: Ticket[];
};

function TicketCard({ tickets }: TicketCardProps) {
	const selectedTickets = useSelector(
		(state: RootState) => state.ticketState.items
	);
	const { status, succeeded } = useSelector(
		(state: RootState) => state.ticketState
	);

	const dispatch = useDispatch();

	const addTicket = (ticket: Ticket) => {
		dispatch(add(ticket));
	};

	const IsSelected = (ticketId: string): boolean => {
		return selectedTickets.find((x) => x.id == ticketId) ? true : false;
	};

	return (
		<div className='mt-3 d-flex flex-row flex-wrap'>
			<div style={{ width: '100vw' }}>
				{succeeded && <Alert variant='success'>{status}</Alert>}
				{succeeded == false && <Alert variant='danger'>{status}</Alert>}
			</div>

			{tickets.map((ticket: Ticket) => {
				return (
					<Card
						key={ticket.id}
						className='p-2 m-3'>
						<Card.Body
							className={
								IsSelected(ticket.id)
									? 'bg-warning'
									: 'bg-white '
							}>
							<Card.Title className='text-primary'>
								Görev Sahibi:
								<br></br>
								<small className='text-muted'>
									{ticket.employeeName}
								</small>
							</Card.Title>
							<Card.Text className='text-secondary'>
								{ticket.description}
							</Card.Text>
							<Card.Text>
								<Button
									onClick={() => addTicket(ticket)}
									variant='secondary'>
									{' '}
									Yapılacak Listesine Ekle{' '}
								</Button>
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className='text-muted'>
								{moment(ticket.startDate).format(
									'DD/MM/YYYY HH:mm'
								)}
								-{DateHelper.formatDate(ticket.endDate)}
							</small>
						</Card.Footer>
					</Card>
				);
			})}
		</div>
	);
}

export default TicketCard;
