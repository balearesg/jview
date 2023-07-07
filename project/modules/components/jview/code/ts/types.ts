import { ReactNode } from 'react';

export type IValue = any;

export type Props = {
	rows?: number;
	total?: number;
	loading?: boolean;
	entries?: Array<any>;
	row?: ReactNode;
	header?: ReactNode;
	rowProps?: object;
	fetching?: boolean;
	pagerNext?: ReactNode;
	title?: string;
	isSearch?: boolean;
	onPrev?: Function;
	onNext?: Function;
	current?: number;
	action?: any;
	search?: boolean;
	handleSearch?: (event: any, search: String) => void;
	handleClear?: () => void;
	date?: boolean;
	additionalElement?: ReactNode;
	scroll?: boolean;
	initValues?: any;
	page?: number;
	currentPage?: number;
	preload: any
};

export type State = {
	controller?: any;
};

export type propsController = {
	total: number;
	rows: number;
	action: any;
	current: number;
	entries: Array<any>;
	onPrev: Function;
	onNext: Function;
};
