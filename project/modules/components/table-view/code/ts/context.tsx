import React from 'react';
import {ITableView} from '.';
import {Store} from './store';

interface IContext extends ITableView {
	store: Store;
}

export const TableViewContext = React.createContext({} as IContext);
export const useTableViewContext = () => React.useContext(TableViewContext);
