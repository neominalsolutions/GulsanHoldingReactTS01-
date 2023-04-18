import React, { useEffect } from 'react';

function HomePage() {
	useEffect(() => {
		// burası homepage componentine istek atıldığında apidan veri çekmemizi sağlayan hook. async çalışır. sayfa açılışında apidan veri çekme işlemleri bu hook içerisinde yazılır.
		// sayfa yüklenirken componente gösterilecek olan verinin hazır hale gelmesini istiyorsak bu hook kullanımı önerilir.

		// axios ile yapabiliriz
		// js fetch paketi
		// reactQuery => axios

		// fetch default httpget çalışır.
		fetch('https://localhost:7044/api/Tickets')
			.then((response) => response.json())
			.then((data) => {
				console.log('data', data);
			});

		return () => {};
	}, []);

	return (
		<div>
			<h1>Anasayfa</h1>
		</div>
	);
}

export default HomePage;
