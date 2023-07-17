import * as React from 'react';
import {JView} from 'jview/jview.code';
import {useBinder} from '@beyond-js/react-18-widgets/hooks';

export function Table({manager}) {
	const [state, setState] = React.useState(manager);
	const [fetching, setFetching] = React.useState(manager.fetching);
	const [searchValue, setSearchValue] = React.useState('');
	const [collection, setCollection] = React.useState(manager.collection);
	useBinder([manager], () => {
		setState(manager);
		setFetching(manager.fetching);
		setCollection(manager.collection);
	});

	const value = {
		dataHead: [
			{label: 'Nombre', id: '1'},
			{label: 'Nombre del negocio', id: '2'},
		],
		entries: manager.collection.items,
		keys: ['name', 'businessName'],
		rows: manager.limit,
		total: manager.collection.total,
		pagerNext: true,
		onNext: manager.next,
		onPrev: manager.prev,
		title: 'Listado de compañías',
		isSearch: true,
		search: {
			value: searchValue,
			onChange: (event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value),
			onSearch: state.search,
			onReset: () => setSearchValue(''),
		},
	};

	return (
		<div className="table">
			<JView {...value} />
		</div>
	);
}
