import React, { useContext } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AbilityContext, Can } from '../casl/Can';
import { LocalStorageService } from '../storage/LocalStorage';
import { updateAbility } from '../casl/Ability';
import { RootState } from '../slices/Store';
import { useSelector } from 'react-redux';
import { Ticket } from '../network/taskClient';

export interface IMenu {
	text: string;
	url: string;
}

function Menu() {
	const ability = useContext(AbilityContext);
	const navigate = useNavigate();

	const selectedTickets = useSelector(
		(state: RootState) => state.ticketState.items
	);

	const menuList: Array<IMenu> = [
		{
			text: 'Anasayfa',
			url: '/',
		},
		{
			text: 'Hakkımızda',
			url: '/about',
		},
		{
			text: 'Promise Örneği',
			url: '/promises',
		},
	];

	return (
		<Navbar
			bg='light'
			expand='lg'>
			<Container>
				<Navbar.Brand href='/'>Gulsan Holding</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						{menuList.map((menu: IMenu, index: number) => {
							return (
								<Nav.Link key={index}>
									<Link to={menu.url}>{menu.text}</Link>
								</Nav.Link>
							);
						})}

						{selectedTickets && (
							<NavDropdown
								title={`${selectedTickets.length} items`}
								id='basic-nav-dropdown'>
								{selectedTickets.map((ticket: Ticket) => {
									return (
										<NavDropdown.Item>
											<div>{ticket.description}</div>
										</NavDropdown.Item>
									);
								})}
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>

				<Navbar.Collapse
					id='basic-navbar-nav'
					className='justify-content-end'>
					<NavDropdown
						title={LocalStorageService.getEmail()}
						id='basic-nav-dropdown'>
						{ability.can('unauthorized') && (
							<NavDropdown.Item>
								<Link
									style={{ textDecoration: 'none' }}
									to={'/account/login'}>
									Oturum Aç
								</Link>
							</NavDropdown.Item>
						)}
						{ability.can('unauthorized') && (
							<NavDropdown.Item>
								<Link
									style={{ textDecoration: 'none' }}
									to={'/account/new-login'}>
									Oturum Aç (Yeni)
								</Link>
							</NavDropdown.Item>
						)}
						{ability.can('authorized') && (
							<NavDropdown.Item>
								<div
									onClick={() => {
										LocalStorageService.removeTokens();
										updateAbility(ability, null);
										navigate('/account/new-login');
									}}
									className='link text-primary'>
									Oturumu Kapat
								</div>
							</NavDropdown.Item>
						)}
						<Can
							I='login'
							an='adminPanel'
							ability={ability}>
							<NavDropdown.Item>
								<div
									onClick={() => {
										navigate('/admin');
									}}
									className='link text-primary'>
									Yönetici Girişi
								</div>
							</NavDropdown.Item>
						</Can>
					</NavDropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Menu;
