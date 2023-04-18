import React from 'react';
// import { RouteObject, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
// import { RouteObject } from 'react-router-dom';

import { RouteObject, useRoutes } from 'react-router-dom';

function App() {
	// bu uygulamanın ilk ayağa kalktığı dosya olduğu için tüm yönlendirme routing.config dosyaları buradan çalıacaktır.
	// useRoutes hook artık uygulamanın clientside route tanımlarını okumasını sağlarız.
	const routes: RouteObject[] = [
		{
			path: '/',
			element: <Layout />, // nested route yapısı ile layout altında tanımlanan children dizisindeki tanımların hepsi layout component üzerinden çalışacaktır.
			children: [
				{
					path: '/',
					element: <>Home Page</>,
				},
				{
					path: '/home',
					element: <>Home Page</>,
				},
				{
					path: '/about',
					element: (
						<>
							<h1>About Page</h1>
						</>
					),
				},
			],
		},
		{
			path: '/admin', // admin routes
			element: <>Admin Page</>,
			children: [
				{
					path: '/admin/users',
					element: <>User Page</>,
				},
			],
		},
	];
	//useRoutes();
	// useRoute ile uygulama bu routeları kullansın
	return useRoutes(routes);
}

export default App;
