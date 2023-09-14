import { ReactNode } from 'react';

export type TValue = any;

export type TTable = {
	label: string;
	key?: string;
	id?: string
};


export type TProps = {
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
		tables: Array<TTable>;
		save: (newConfig: Array<TTable>) => void;
		max?: number;
		isMax?: boolean;
		selectAll?: boolean;
	}
};

export type TState = {
	controller?: any;
};

export type TPropsController = {
	total: number;
	rows: number;
	action: any;
	current: number;
	entries: Array<any>;
	onPrev?: Function;
	onNext: Function;
	dataHead?: any[]
};
