import * as React from 'react';
import {JView} from '@bg/jview/jview.code';
import {useBinder} from '@beyond-js/react-18-widgets/hooks';
export function Table({store}) {
	const [state, setState] = React.useState(store);
	useBinder([store], () => setState(store));

	const value = {
		dataHead: [
			{label: 'Name', id: '1'},
			{label: 'Bussines name', id: '2'},
		],
		entries: state.collection.items,
		keys: ['name', 'bussinesName'],
		rows: state.limit,
		total: state.collection.total,
		pagerNext: true,
		onNext: state.next,
		onPrev: state.prev,
		title: 'Companues',
	};

	return (
		<div className="table">
			<JView {...value} />
		</div>
	);
}
