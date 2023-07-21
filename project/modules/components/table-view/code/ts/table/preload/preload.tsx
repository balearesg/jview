import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useTableViewContext} from '../../context';
import {PreloadItem} from './item';
import {PreloadHeader} from './header';

export function Preload() {
	const {rows} = useTableViewContext();
	const output = Array.from(Array(rows).keys()).map(() => <PreloadItem key={uuidv4()} />);

	return (
		<table className="loading-state">
			<PreloadHeader />
			<tbody>{output}</tbody>
		</table>
	);
}
