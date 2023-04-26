import React, { useState } from 'react';
import {
	LoginClient,
	LoginModel,
	LoginResult,
} from '../../network/loginClient';
import { useNavigate } from 'react-router-dom';
import { Alert, Col, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

function NewLoginPage() {
	const navigate = useNavigate(); // react-router-dom dana gelen hook ile ts den yönlendirme yapılabilir
	const loginService = new LoginClient();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<LoginModel>({
		defaultValues: {
			email: 'test@test.com',
			password: 'Test12345?',
		},
	});

	// Mutations
	const loginClient = useMutation({
		mutationFn: async (formValue: LoginModel) => {
			return await loginService.login(formValue);
		},
		onSuccess: (result: LoginResult, formData: LoginModel) => {
			console.log('formData', formData);
			if (result.isSucceded) {
				navigate('/');
			}
		},
		onError: (result: LoginResult) => {
			console.log(`mut-error`, result.errorMessage);
			//alert(result.errorMessage);
		},
	});

	const onSubmit: SubmitHandler<LoginModel> = async (formValue) => {
		await loginClient.mutate(formValue); // login operasyonun
	};

	// formu gönderirken html5 validayonlara takılmaması için noValidate yazık

	// loginClient sarmalladığı hata durumlarına göre ekranda hata mesajımızı göstermiş olduk.
	return (
		<Row>
			{loginClient.isError && (
				<Alert variant='danger'>{loginClient.error.errorMessage}</Alert>
			)}
			<Col
				className='m-auto'
				md={4}>
				<div className='container p-5'>
					<h1> Giriş </h1>
					<form
						method='post'
						onSubmit={handleSubmit(onSubmit)}
						noValidate>
						<input
							className='form-control'
							type='email'
							{...register('email', {
								required: {
									value: true,
									message: 'e-posta boş geçilemez',
								},
								validate: (value) => {
									return (
										value.includes('@') ||
										'e-posta formatında giriş yapınız'
									);
								},
							})}
							placeholder='email'
						/>
						<span className='text-danger'>
							{errors.email?.message}
						</span>
						<br></br>
						<input
							className='form-control'
							type='password'
							{...register('password', {
								required: {
									value: true,
									message: 'parola alanı boş geçilemez',
								},
								minLength: {
									value: 8,
									message:
										'minimum 8 karakter uzunluğunda olmalıdır',
								},
								validate: (value) => {
									return (
										[
											/[a-z]/,
											/[A-Z]/,
											/[0-9]/,
											/[^a-zA-Z0-9]/,
										].every((pattern) =>
											pattern.test(value)
										) ||
										'must include lower, upper, number, and special chars'
									);
								},
							})}
							placeholder='password'
						/>
						<span className='text-danger'>
							{errors.password?.message}
						</span>
						<br></br>
						<div className='d-flex flex-row'>
							<input
								className='btn btn-success ms-auto'
								type='submit'
								value='Oturum Aç'
							/>
						</div>
					</form>
				</div>
			</Col>
		</Row>
	);
}

export default NewLoginPage;
