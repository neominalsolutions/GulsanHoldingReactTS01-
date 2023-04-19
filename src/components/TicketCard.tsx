import React from 'react';
import { Card, CardGroup, Col, Row } from 'react-bootstrap';
import { Ticket } from '../network/taskClient';
import moment from 'moment';
import { DateHelper } from '../utils/dateHelper';

export type TicketCardProps = {
	tickets: Ticket[];
};

function TicketCard({ tickets }: TicketCardProps) {
	// moment() new Date
	// moment().format('dd/MM/YYYY');

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
				</Col>
			))}
		</Row>
	);
}

export default TicketCard;
