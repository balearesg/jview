import React from 'react';
import {JView} from 'jview/jview.code';
import {useBinder} from '@beyond-js/react-18-widgets/hooks';
import {Item} from './item';

export function JViewTab({store}) {
	const [data, setData] = React.useState([]);
	useBinder([store], () => setData(store.collection.items));

	const value = {
		dataHead: [
			{label: 'Name', id: '1'},
			{label: 'Bussines name', id: '2'},
		],
		entries: data,
		rows: store.limit,
		total: data.length,
		pagerNext: true,
		item: Item,
	};

	return (
		<div className="jview-test-page">
			<JView {...value} />
		</div>
	);
}
