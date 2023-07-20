import * as React from 'react';
import {TableView} from 'jview/table-view';
import {useBinder} from '@beyond-js/react-18-widgets/hooks';
import {Item} from './item';

export function Table({store}) {
	const [state, setState] = React.useState(store);
	const [searchValue, setSearchValue] = React.useState('');
	useBinder([store], () => {
		setState(store);
	});

	const value = {
		collection: store.collection,
		item: Item,
		columns: ['Name', 'Business name'],
		rows: store.limit,
		paginator: {
			onChange: store.navigation,
		},
		searchbar: {
			onSearch: () => store.search(searchValue),
			onResetInput: () => setSearchValue(''),
			value: searchValue,
			onChange: (event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value),
		},
		title: 'Companies',
		// addButton: {
		// 	onClick: () => {
		// 		store.itemToEdit = undefined;
		// 	},
		// },
	};

	return (
		<div className="table">
			<TableView {...value} />
		</div>
	);
}
