import React, { useEffect, useState } from 'react';
import { TicketClient, Ticket } from '../../network/taskClient';
import TicketCard from '../../components/TicketCard';
import { Col, Row } from 'react-bootstrap';
import EmployeeSelector from '../../components/EmployeeSelector';

const fetchTickets = async (signal: any) => {
	// fetch default httpget çalışır.
	fetch('https://localhost:7044/api/Tickets', { signal })
		.then((response) => response.json())
		.then((data) => {
			console.log('data', data);
		})
		.catch((err: any) => {
			console.log(err);
		})
		.finally(() => {
			// loading hide
			// hata yada başarılı olmaya bakmaksızın çalışan blok
			alert('istek sonladı');
		});
};

function HomePage() {
	// let tickets: Ticket[] = [];
	const [tickets, setTickets] = useState<Ticket[]>([]);

	const ticketClient = new TicketClient(); // ticketClient instance aldık bağlantık.

	const getTickets = async () => {
		setTickets(await ticketClient.getTickets()); // client apidan veri çektik.
		// setState ile arayüze basabiliriz.

		// ticketClient
		// 	.getTickets()
		// 	.then((response) => {
		// 		console.log('ticket-res');
		// 	})
		// 	.catch((err) => {
		// 		console.log('err', err);
		// 	});

		console.log('tickets', tickets);
	};

	useEffect(() => {
		getTickets(); // veriyi çek.
		// const interval = setInterval(() => {
		// 	console.log('int');
		// }, 1000);
		// burası homepage componentine istek atıldığında apidan veri çekmemizi sağlayan hook. async çalışır. sayfa açılışında apidan veri çekme işlemleri bu hook içerisinde yazılır.
		// sayfa yüklenirken componente gösterilecek olan verinin hazır hale gelmesini istiyorsak bu hook kullanımı önerilir.
		// axios ile yapabiliriz
		// js fetch paketi
		// reactQuery => axios
		// network isteği bittikten sonra network isteğini kesmek için kaynağın geri tarayıcıya verilmesi için bir performans ayarı
		console.log('component doma girdi');
		const controller = new AbortController();
		const signal = controller.signal;
		// fetchTickets(signal);
		// clean up function
		return () => {
			// component domdan ayrıldığında component içinde bağlı bir kaynak varsa kesinti yapacağımız kısım
			// component bir route değişikliğinde domdan çıktığında burası tetiklenir
			console.log('component domdan ayrıldı');
			// clearInterval(interval);
			controller.abort();
			// kaynakları dispose ettiğimiz yer.
		};
	}, []); // burada herhangi bir state olmadığında hiç bir state değişimini takip etme sadece sayfa açılışın 1 kez çalış. // sayfa açılırken apidan veri çekme işleminde sadece [] kullanırız.

	// useEffect(() => {
	// 	console.log('[] tanımı yapmadık her bir state değişiminde çalıştı');
	// }); // state ne olduğu önemli değil herhangi bir state değişiminde çalış.

	/*
	useEffect(() => {
		console.log('sadece counter state her değişimini takip edecektir');
		// api istek atamdan arayüzde bir işlem yapmışım.yada interval timer gibi yapılar kullanmadım.
		// api bağlanmıyporsak retur functiona gerek yok.
	}, [c, counter]); // [state dependency diyoruz] // ya c yada counter state takip et, istedeiğimiz kadar state takibini yapabiliriz. [state1,state2] yazılan statelerin takibini yapar.

	*/

	const employeSelect = async (id: string) => {
		alert('seçilen' + id);
		// git ticketları idsine göre filterele state değiştir.
		setTickets(await ticketClient.getTicketsByCustomer(id));
		// apiden çek state güncelle.
	};
	return (
		<div>
			<Row>
				<Col>
					<EmployeeSelector
						onSelected={(id: string) => employeSelect(id)}
						employees={[
							{ id: '1', fullName: 'ali' },
							{ id: '2', fullName: 'Can' },
						]}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<TicketCard tickets={tickets} />
				</Col>
			</Row>
		</div>
	);
}

export default HomePage;
