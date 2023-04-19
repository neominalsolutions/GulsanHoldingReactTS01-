import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
	// <React.StrictMode>
	// sadece development da test amaçlı açık olan bir mod bu mod yüzünden component içerisindeki hooklar iki kez tetiklenir. ama production modda burası kapalı.
	/* BrowserRouter ile tüm uygulama sarmallıyoruz ve tüm uygulama JS routing yapar. */

	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
