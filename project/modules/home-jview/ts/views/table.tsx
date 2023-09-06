import * as React from 'react';
import { JView } from 'jview/jview.code';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { head } from './keys';

export function Table({ manager }) {


	const value = {
		dataHead: manager.heads,
		entries: manager.collection.items,
		keys: manager.heads.map(item => item.id),
		rows: manager.limit,
		total: manager.collection.total,
		currentPage: manager.currentPage,
		pagerNext: true,
		onNext: manager.next,
		onPrev: manager.prev,
		title: 'Listado de compañías',
		isSearch: true,
		load: manager.changeEntries,
		search: {
			onSearch: manager.search,
			onClear: manager.load
		},
		panel: {
			tables: head,
			entity: `jview`,
			max: 2,
			isMax: true,
			save: (tables) => manager.heads = tables
		},
		actions: {
			create: {
				label: "Crear item",
				onClick: () => { },
			},
			delete: {},
			edit: {},
			status: {},
			export: {},
			order: {},
		}
	};

	return (
		<div className="table">
			<JView {...value} />
		</div>
	);
}
