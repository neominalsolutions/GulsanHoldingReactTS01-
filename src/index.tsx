import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AbilityContext } from './casl/Can';
import { Ability } from '@casl/ability';
import { Provider } from 'react-redux';
import { store } from './slices/Store';

// Tüm uygulamayı queryclient provider ile sarmallarız. Böyle tüm uygulama genelinde bütün hata mesajları tüm asenkron işlemler react-query ile sarmallanır, başarılı ve hata durumlarını yakalama şansımız olur.
// daha sonra post,put,delete gibi işlemler için mutation veri yakalama fetch işlemleri için ise query kullanırız. Tüm network akışı belirli bir formatta sarmallanmış olur.

// Create a client
const queryClient = new QueryClient();
const ability = new Ability();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<AbilityContext.Provider value={ability}>
				<QueryClientProvider client={queryClient}>
					<React.Suspense fallback={<>... Loading</>}>
						<App />
					</React.Suspense>
				</QueryClientProvider>
			</AbilityContext.Provider>
		</Provider>
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
