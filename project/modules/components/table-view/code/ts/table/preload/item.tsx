import React from 'react';
import {v4 as uuidv4} from 'uuid';

import {useTableViewContext} from '../../context';

export function PreloadItem() {
	const {columns} = useTableViewContext();
	const output = Array.from(Array(columns.length).keys()).map(() => (
		<td key={uuidv4()}>
			<div className="loader">
				<div className="indicator"></div>
			</div>
		</td>
	));

	return <tr className="preload-item">{output}</tr>;
}
