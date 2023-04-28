import { execPath } from 'process';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LocalStorageService } from '../storage/LocalStorage';

type Props = {
	children?: any;
};

export default function AuthGuard({ children }: Props) {
	let location = useLocation();
	const isAuthenticated =
		LocalStorageService.getAccessToken() != null ? true : false;
	// localstorage üzerinden access token ile token var mı yok mu kontrolleri yaparak, kullanıcın sisteme authenticated olup olmadığını kontrol ederiz yada rol amaçlı kullanıyorsak oturum açmış olan kullanıcının role bilgilerine göre yöneldirme yapacağız.
	// bu yöntemde yetki dahilinde sayfaları merkezi bir yerden koruma altına almak istiyoruz.

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/account/new-login'
				state={{ from: location }}></Navigate>
		);
	}

	return children;
}
