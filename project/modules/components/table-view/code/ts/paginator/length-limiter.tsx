import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useTableViewContext} from '../context';
import {routing} from '@beyond-js/kernel/routing';

const DEFAULT_LENGTH_OPTIONS = [5, 10, 20, 30];
const DEFAULT_LENGTH = 10;

export function LengthLimiter() {
	const {store} = useTableViewContext();
	const lengthUrl = Number(routing.uri.qs.get('limit'));
	const defaultLengthValue = lengthUrl || store.rows || DEFAULT_LENGTH;
	const [value, setValue] = React.useState(defaultLengthValue);
	const optionsToUse = DEFAULT_LENGTH_OPTIONS;

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const {value} = event.target;
		setValue(Number(value));

		store.onLengthLimiterChange(Number(value));
	};

	const options = optionsToUse.map(option => (
		<option key={uuidv4()} value={option}>
			{option}
		</option>
	));

	return (
		<select onChange={onChange} value={value} placeholder="10" className="length-limiter" name="length-limiter">
			{options}
		</select>
	);
}
