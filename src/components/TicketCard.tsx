import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { Ticket } from '../network/taskClient';

export type TicketCardProps = {
	tickets: Ticket[];
};

function TicketCard({ tickets }: TicketCardProps) {
	return (
		<CardGroup className='mt-5'>
			{tickets.map((ticket: Ticket) => {
				return (
					<Card key={ticket.id}>
						<Card.Body>
							<Card.Title>
								Atanan: {ticket.employeeName}
							</Card.Title>
							<Card.Text>{ticket.description}</Card.Text>
						</Card.Body>
						<Card.Footer>
							{/* <small className='text-muted'>
								{ticket.startDate.toString()}{' '}
								{ticket.endDate.toString()}
							</small> */}
						</Card.Footer>
					</Card>
				);
			})}
		</CardGroup>
	);
}

export default TicketCard;
