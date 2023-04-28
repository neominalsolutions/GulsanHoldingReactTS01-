import React, { ChangeEvent, useState } from 'react';

function FileUploadPage() {
	const [file, setFile] = useState<File>();

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleUploadClick = () => {
		if (!file) {
			return;
		}

		// 👇 Create new FormData object and append files
		const data = new FormData();
		data.append(`file`, file, file.name);

		// 👇 Uploading the file using the fetch API to the server
		fetch('https://localhost:7044/api/Files/upload', {
			method: 'POST',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	};

	return (
		<div>
			<div className='mt-3'>
				<input
					className='form-control'
					type='file'
					onChange={handleFileChange}
				/>

				<div>{file && `${file.name} - ${file.type}`}</div>

				<button
					className='btn btn-primary'
					onClick={handleUploadClick}>
					Upload
				</button>
			</div>
		</div>
	);
}

export default FileUploadPage;
