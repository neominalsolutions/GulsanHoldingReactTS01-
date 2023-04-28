import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouteObject, useRoutes } from 'react-router-dom';
import { updateAbility } from './casl/Ability';
import { LocalStorageService } from './storage/LocalStorage';
import { AbilityContext } from './casl/Can';
import { lazy, useContext } from 'react';
import { Can } from '@casl/react';
import AuthGuard from './guards/AuthGuard';
import FileUploadPage from './pages/files/FileUploadPage';

const HomePage = lazy(() => import('./pages/home/HomePage'));

const AboutPage = lazy(() => import('./pages/about/AboutPage'));

const Promises = lazy(() => import('./pages/promises/Promises'));

const LoginPage = lazy(() => import('./pages/login/LoginPage'));

const NewLoginPage = lazy(() => import('./pages/login/NewLoginPage'));

function App() {
	// bu uygulamanın ilk ayağa kalktığı dosya olduğu için tüm yönlendirme routing.config dosyaları buradan çalıacaktır.
	// useRoutes hook artık uygulamanın clientside route tanımlarını okumasını sağlarız.

	// updateAbility(LocalStorageService.getUserInfo());

	const ability = useContext(AbilityContext);
	const user = LocalStorageService.getUserInfo();

	updateAbility(ability, user);

	const routes: RouteObject[] = [
		{
			path: '/',
			element: <Layout />, // nested route yapısı ile layout altında tanımlanan children dizisindeki tanımların hepsi layout component üzerinden çalışacaktır.
			children: [
				{
					path: '/',
					element: <HomePage />,
				},
				{
					path: '/home',
					element: <HomePage />,
				},
				{
					path: '/about',
					element: <AboutPage />,
				},
				{
					path: '/promises',
					element: <Promises />,
				},
				{
					path: '/file-upload',
					element: <FileUploadPage />,
				},
			],
		},
		{
			path: '/account/login',
			element: <LoginPage />,
		},
		{
			path: '/account/new-login',
			element: <NewLoginPage />,
		},
		{
			path: '/admin', // admin routes
			element: (
				<AuthGuard>
					<>Admin Panel</>
				</AuthGuard>
			),
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
