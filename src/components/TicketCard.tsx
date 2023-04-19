import React from 'react';
import { Card, CardGroup, Col, Row } from 'react-bootstrap';
import { Ticket } from '../network/taskClient';

export type TicketCardProps = {
	tickets: Ticket[];
};

function TicketCard({ tickets }: TicketCardProps) {
	return (
		<Row
			xs={1}
			md={2}
			className='g-4 mt-5'>
			{Array.from({ length: 2 }).map((_, idx) => (
				<Col>
					{tickets.map((ticket: Ticket) => {
						return (
							<Card
								key={ticket.id}
								className='mb-3'>
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
				</Col>
			))}
		</Row>
	);
}

export default TicketCard;
