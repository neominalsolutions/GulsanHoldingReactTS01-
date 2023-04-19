import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export interface IMenu {
	text: string;
	url: string;
}

function Menu() {
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
		{
			text: 'Oturum Aç',
			url: '/account/login',
		},
	];

	return (
		<Navbar
			bg='light'
			expand='lg'>
			<Container>
				<Navbar.Brand href='/'>Gulsan Holding React TS</Navbar.Brand>
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
							title='Dropdown'
							id='basic-nav-dropdown'>
							<NavDropdown.Item href='#action/3.1'>
								Action
							</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.2'>
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.3'>
								Something
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href='#action/3.4'>
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Menu;
