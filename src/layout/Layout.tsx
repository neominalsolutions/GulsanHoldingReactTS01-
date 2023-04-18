import React from 'react';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
// import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div>
			<Header text='Gülsan Holding' />
			<Menu />

			<Container style={{ height: '80vh' }}>
				{/* dinamik içeriğin değişeceği kısmı outlet olarak iaşaretledik. sayfalar değişince buraya ilgili sayfa componentleri gelecek. */}
				<Outlet />
			</Container>

			<Container fluid>
				<Footer>
					{/* p olan jsx elementini Footer içinde Layout içerisinde gönderdik. children <p> elementi yakalıyp ilgili div içine basacaktır. */}
					<Row
						style={{
							textAlign: 'center',
							backgroundColor: 'GrayText',
							color: 'white',
							position: 'fixed',
							width: '100%',
							bottom: '0',
						}}>
						<p>Alt Bilgi &copy Gulsan Holding</p>
						<span>Yıl: {new Date().getFullYear()}</span>
					</Row>
				</Footer>
			</Container>
		</div>
	);
}

export default Layout;
