import * as React from 'react';
import {TableView} from 'jview/table-view';
import {Item} from './item';
export function TableViewTab({store}) {
	const [searchValue, setSearchValue] = React.useState('');

	const value = {
		columns: ['Name', 'Business name'],
		item: Item,
		rows: store.limit,
		title: 'Companies',
		collection: store.collection,
		paginator: {
			onChange: store.onPaginatorChange,
		},
		searchbar: {
			onSearch: () => store.search(searchValue),
			onChange: (event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value),
		},
	};

	return (
		<div className="table-view-test-page">
			<TableView {...value} />
		</div>
	);
}
