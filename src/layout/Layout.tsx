import React from 'react';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div>
			<Header text='Gülsan Holding React TS App' />
			<Menu />

			<main>
				{/* dinamik içeriğin değişeceği kısmı outlet olarak iaşaretledik. sayfalar değişince buraya ilgili sayfa componentleri gelecek. */}
				<Outlet />
			</main>

			<Footer>
				{/* p olan jsx elementini Footer içinde Layout içerisinde gönderdik. children <p> elementi yakalıyp ilgili div içine basacaktır. */}
				<p>Alt Bilgi &copy Gulsan Holding</p>
				<span>Yıl: {new Date().getFullYear()}</span>
			</Footer>
		</div>
	);
}

export default Layout;
