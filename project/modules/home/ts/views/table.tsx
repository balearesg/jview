import * as React from 'react';
import {JView} from 'jview/jview.code';
import {useBinder} from '@beyond-js/react-18-widgets/hooks';
export function Table({store}) {
	const [state, setState] = React.useState(store);
	const [fetching, setFetching] = React.useState(store.fetching);
	const [searchValue, setSearchValue] = React.useState('');
	const [collection, setCollection] = React.useState(store.collection);
	useBinder([store], () => {
		setState(store);
		setFetching(store.fetching);
		setCollection(store.collection);
	});

	const value = {
		dataHead: [
			{label: 'Name', id: '1'},
			{label: 'Bussines name', id: '2'},
		],
		entries: collection.items,
		keys: ['name', 'businessName'],
		rows: state.limit,
		total: collection.total,
		pagerNext: true,
		onNext: state.next,
		onPrev: state.prev,
		title: 'Companies',
		loading: fetching,
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
