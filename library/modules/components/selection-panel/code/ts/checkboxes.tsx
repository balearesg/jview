import React, { ChangeEvent } from 'react';
import { Checkbox } from 'pragmate-ui/form';
import { v4 as uuid } from 'uuid';
import { usePanelContext } from './context';
import { values } from './types';

export function Checkboxes(): JSX.Element {
	const { states, max, setValues, values } = usePanelContext();

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const { name, value, type, checked }: HTMLInputElement & EventTarget = event.currentTarget as HTMLInputElement;
		if (type === 'checkbox' && name !== 'all') {
			const allValues: values = { ...values };
			delete allValues.all;
			delete allValues.search;
			const validateChecks: Array<boolean> = Object.values(allValues).filter((table): boolean => table === true);

			if (validateChecks.length >= max && checked) return;

			setValues({
				...values,
				[name]: checked,
				all: validateChecks.length === max - 1,
			});
		}
	};

	const output: JSX.Element[] = states.items.map((table): JSX.Element => {
		return (
			<Checkbox
				key={table.id}
				name={table.id}
				onChange={handleChange}
				label={table.label}
				checked={values[table.id]}
			/>
		);
	});
	return <div>{output}</div>;
}
