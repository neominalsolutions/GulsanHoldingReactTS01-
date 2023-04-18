import React from 'react';

export type HeaderProps = {
	text: string; // required
	content?: string; // optional
};

function Header({ text, content = 'Content' }: HeaderProps) {
	return (
		<div>
			<h1>{text}</h1>
			<p>{content}</p>
		</div>
	);
}

export default Header;

// Not: React TS de defaultProps ve PropTypes yoktur bunun yerine type tipinde bir değer açarak required ve optional olan değerleri tanımlayabilir ve default değer vericek ise propslara direk geçerbiliriz.
