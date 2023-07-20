import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useTableViewContext} from '../context';

export function Header() {
	const {columns} = useTableViewContext();
	const output = columns.map(item => <th key={uuidv4()}>{item}</th>);

	return (
		<thead>
			<tr>{output}</tr>
		</thead>
	);
}
