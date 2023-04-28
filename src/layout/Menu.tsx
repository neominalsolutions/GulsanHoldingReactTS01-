import React, { useContext } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AbilityContext, Can } from '../casl/Can';
import { LocalStorageService } from '../storage/LocalStorage';
import { updateAbility } from '../casl/Ability';
import { RootState } from '../slices/Store';
import { useSelector } from 'react-redux';
import { Ticket } from '../network/taskClient';
import { useTranslation } from 'react-i18next';

export interface IMenu {
	text: string;
	url: string;
}

function Menu() {
	const ability = useContext(AbilityContext);
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const selectedTickets = useSelector(
		(state: RootState) => state.ticketState.items
	);

	const menuList: Array<IMenu> = [
		{
			text: t('menu.home'),
			url: '/',
		},
		{
			text: t('menu.about'),
			url: '/about',
		},
		{
			text: t('menu.promise'),
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

						<NavDropdown
							title={t('menu.languages', { count: 3 })}
							id='basic-nav-dropdown'>
							<NavDropdown.Item
								onClick={() => {
									i18n.changeLanguage('tr-TR');
								}}>
								<div>tr-TR</div>
							</NavDropdown.Item>
							<NavDropdown.Item
								onClick={() => {
									i18n.changeLanguage('en-US');
								}}>
								<div>en-TR</div>
							</NavDropdown.Item>
						</NavDropdown>

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
