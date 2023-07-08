import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useTableViewContext} from '../context';
import {useBinder} from '@beyond-js/react-18-widgets/hooks';
import {Page} from './page';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react';

const FIRST_PAGE = 1;
const DEFAULT_PAGE = 1;

export interface IPaginator {
	currentPage: number;
	onLengthLimiterChange?: (value: number) => void;
	onChange: (params: {page: number; next: number; limit: number; total: number}) => Promise<void>;
	defaultLength?: number;
	lengthOptions?: number[];
}

export function Paginator() {
	const {store} = useTableViewContext();
	const [currentPage, setCurrentPage] = React.useState(store.currentPage);
	const [total, setTotal] = React.useState(store.total);
	const [limit, setLimit] = React.useState(store.rows);
	const totalPages = Math.ceil(total / limit) || DEFAULT_PAGE;
	const NEXT_PAGE = currentPage + DEFAULT_PAGE;

	useBinder([store], () => {
		setTotal(store.total);
		setCurrentPage(store.currentPage);
		setLimit(store.rows);
	});

	const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.currentTarget;
		const {page} = target.dataset;

		store.onChange(Number(page));
	};

	const output = [...Array(totalPages).keys()].map(page => {
		const pageValue = page + 1;
		const current = pageValue === currentPage;
		return <Page key={uuidv4()} onClick={onButtonClick} dataPage={pageValue} current={current} />;
	});

	const isNextDisabled = currentPage + DEFAULT_PAGE > totalPages;
	const isPrevDisabled = currentPage === FIRST_PAGE;

	return (
		<footer className="paginator">
			<button
				disabled={isPrevDisabled}
				className="page-indicator shortcut"
				data-page={FIRST_PAGE}
				onClick={onButtonClick}
			>
				<ArrowLeft2 className="icon" />
			</button>
			<ol className="pages-lists">{output}</ol>
			<button
				disabled={isNextDisabled}
				className="page-indicator shortcut"
				data-page={NEXT_PAGE}
				onClick={onButtonClick}
			>
				<ArrowRight2 className="icon" />
			</button>
		</footer>
	);
}
