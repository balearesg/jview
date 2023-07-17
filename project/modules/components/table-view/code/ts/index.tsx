import React from 'react';
import {Collection} from '@beyond-js/reactive/entities';
import {routing} from '@beyond-js/kernel/routing';
import {TableViewContext} from './context';
import {Store} from './store';
import {Pager} from './paginator';
import {Table} from './table/table';
import {Header as DefaultHeader} from './header';
import {IProps as ISearchbar} from './searchbar';
import {IPaginator} from './paginator/paginator';
import {Icon} from 'iconsax-react';

export interface ITableView {
	columns: string[];
	item: new () => React.Component;
	rows: number;
	collection: Collection;
	title?: string;
	paginator: IPaginator;
	header?: new () => React.Component;
	searchbar?: ISearchbar;
	empty?: {
		icon: Icon;
		label: string;
	};
	addButton?: React.AllHTMLAttributes<HTMLButtonElement>;
}

export /*bundle*/ function TableView({header, ...props}: ITableView) {
	const routePage = Number(routing.uri.qs.get('page'));
	const routeRows = Number(routing.uri.qs.get('limit')) || props?.rows;
	const store = new Store({...props, page: routePage, rows: routeRows});

	const Header = !header ? DefaultHeader : header;

	const contextValue = {
		store,
		...props,
	};

	return (
		<TableViewContext.Provider value={contextValue}>
			<div className="table-view">
				<Header />
				<Table />
				<Pager />
			</div>
		</TableViewContext.Provider>
	);
}
