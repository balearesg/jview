import React from 'react';
import { Header } from './header';
import { Items } from './items';
import { useJViewContext } from '../context';
import { EmptyView } from '../empty-view';

export function Table(): JSX.Element {
	const { entries } = useJViewContext();
	const cls = !entries.length ? 'empty' : '';

	return (
		<div className="table-content-container">
			<table className={`table ${cls}`}>
				<Header />
				{!!entries.length && (
					<tbody>
						<Items />
					</tbody>
				)}
			</table>

			{!entries.length && <EmptyView />}
		</div>
	);
}
