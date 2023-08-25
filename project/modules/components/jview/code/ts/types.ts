import { ReactNode } from 'react';

export type IValue = any;

export type table = {
	label: string;
	key?: string;
	id?: string
};


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
	search: any;
	onPrev?: Function;
	onNext?: Function;
	current?: number;
	action?: any;
	handleSearch?: (event: any, search: String) => void;
	handleClear?: () => void;
	date?: boolean;
	additionalElement?: ReactNode;
	scroll?: boolean;
	initValues?: any;
	page?: number;
	currentPage?: number;
	preload?: any;
	create?: {
		label: string,
		onClick: () => void;
	},
	panel: {
		tables: Array<table>;
		save: (newConfig: Array<table>) => void;
		max?: number;
		isMax?: boolean;
		selectAll?: boolean;
	}
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
	onPrev?: Function;
	onNext: Function;
	dataHead?: any[]
};
