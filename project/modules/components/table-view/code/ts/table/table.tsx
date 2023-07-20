import React from 'react';
import {Header} from './header';
import {Body} from './body';
import {useTableViewContext} from '../context';
import {useBinder} from '@beyond-js/react-18-widgets/hooks';
import {Empty} from '../empty';
import {Preload} from './preload/preload';

export function Table() {
	const {store} = useTableViewContext();
	const [isLoading, setIsLoading] = React.useState(store.fetching);
	const [items, setItems] = React.useState(store.items);

	useBinder([store], () => {
		setIsLoading(store.fetching);
		setItems(store.items);
	});

	if (!items.length) return <Empty />;
	if (isLoading) return <Preload />;

	return (
		<table>
			<Header />
			<Body items={items} />
		</table>
	);
}
