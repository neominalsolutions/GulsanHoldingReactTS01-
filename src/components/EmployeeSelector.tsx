import React from 'react';
import { Form } from 'react-bootstrap';

export interface IEmployee {
	id: string;
	fullName: string;
}

export type EmployeProps = {
	employees: IEmployee[];
};

function EmployeeSelector({ employees }: EmployeProps) {
	const onEmployeeSelect = (event: any) => {
		console.log('id', event.target.value);
	};

	return (
		<Form.Select
			className='mt-3'
			onChange={(event: any) => onEmployeeSelect(event)}
			size='lg'>
			{employees.map((emp: IEmployee) => {
				return (
					<option
						key={emp.id}
						value={emp.id}>
						{emp.fullName}
					</option>
				);
			})}
		</Form.Select>
	);
}

export default EmployeeSelector;
