import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useTableViewContext} from '../../context';

export function PreloadHeader() {
	const {columns} = useTableViewContext();
	const output = Array.from(Array(columns.length).keys()).map(() => (
		<th>
			<div className="loader" key={uuidv4()}>
				<div className="indicator"></div>
			</div>
		</th>
	));

	return (
		<thead>
			<tr className="preload-item">{output}</tr>
		</thead>
	);
}
