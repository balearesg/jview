import * as React from 'react';
import { JView } from '@bggroup/jview/jview';
import { head } from './keys';

export function Table({ manager }) {

	const filter: Array<any> = [
		{ id: "1", name: "Nombre", identifier: "name" },
		{ id: "2", name: "Nombre del negocio", identifier: "businessName" },
	];
	const options = Array.from(Array(15)).map((_, i) => {

		return {
			value: i + 1,
			label: `Option ${i + 1}`
		}
	})
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
		loading: manager.fetching,
		search: {
			onSearch: manager.search,
			onClear: manager.load,
			searchableList: true,
			filter
		},
		panel: {
			tables: head,
			entity: `jview`,
			max: 2,
			isMax: true,
			save: (tables) => manager.heads = tables,
			select: {
				options
			}
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
