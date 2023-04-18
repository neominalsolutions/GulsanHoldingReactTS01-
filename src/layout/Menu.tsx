import React from 'react';
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
	];

	return (
		<nav>
			{menuList.map((menu: IMenu, index: number) => {
				return (
					<Link
						key={index}
						to={menu.url}>
						{menu.text}
					</Link>
				);
			})}
		</nav>
	);
}

export default Menu;
