import * as React from 'react';

export type TValue = any;

export type TTable = {
	label: string;
	key?: string;
	id?: string
};

export type TFilter = {
	id: string;
	name: string;
	identifier?: string;
};

export interface ISearch {
	filter?: Array<TFilter>;
	initValues: { [x: string]: string };
	onSearch?: (params: { [x: string]: string }) => Promise<void>;
	onClear?: () => Promise<void>;
	isClear?: boolean;
	placeholder?: string;
	type?: string;
	date?: boolean;
	dialogTitle?: string;
	searchableList?: boolean;
	element?: any;

};

export type action = {
	label?: string,
	onClick: Function,
}
export type TProps = {
	rows: number;
	total: number;
	loading?: boolean;
	entries: Array<any>;
	item?: React.ReactNode;
	header?: React.ReactNode;
	rowProps?: object;
	pagerNext?: React.ReactNode;
	title?: string;
	isSearch?: boolean;
	search: ISearch;
	onPrev?: Function;
	onNext?: Function;
	actions?: {
		create: action,
		delete: action,
		edit: { url: string },
		status: action,
		export: action,
		order: action,
	},
	additionalElement?: React.ReactNode;
	currentPage?: number;
	panel?: {
		tables: object[],
		entity: string,
		max: number,
		isMax: boolean,
		save: (tables: object[]) => any
	};
	optionsChangeRows?: number[];
	isVisibleHeader?: boolean;
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
