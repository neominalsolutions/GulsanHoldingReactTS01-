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
							title='Yapılacaklar'
							id='basic-nav-dropdown'>
							<NavDropdown.Item>
								<div>Görev 1</div>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<div>Görev 2</div>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>

				<Navbar.Collapse
					id='basic-navbar-nav'
					className='justify-content-end'>
					<NavDropdown
						title='Hesap'
						id='basic-nav-dropdown'>
						<NavDropdown.Item>
							<Link
								style={{ textDecoration: 'none' }}
								to={'/account/login'}>
								Oturum Aç
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<div
								onClick={() => {}}
								className='link text-primary'>
								Oturumu Kapat
							</div>
						</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Menu;
