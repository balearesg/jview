import React, { SyntheticEvent } from 'react';
import { useJViewContext } from '../../context';
import { ShorcutLink } from './shortcut-link';

export function Pager(): JSX.Element {
	const { state, entries, current, pages, texts } = useJViewContext();
	const pagesShowed: number = 2;

	const navigate = (event: SyntheticEvent<HTMLButtonElement, Event>) => {
		const target: EventTarget & HTMLButtonElement = event.currentTarget;
		const { page } = target.dataset;
		state.controller.getPage(page ?? parseInt(page), entries);
	};
	const output: JSX.Element[] = [];
	let middle: number, last: number, first: number;
	if (pages <= 1) return null;
	if (pages > 1 && pages >= current) {
		middle = Math.ceil(pagesShowed / 2);
		last = current + middle <= pages ? current + middle : pages;
		first = current > middle ? current - middle : 1;
	}

	for (let i: number = first; i <= last; ++i) {
		let cls: string = 'pager-item';
		if (i === current) cls += ' item-current';
		output.push(
			<button type="button" className={cls} data-page={i} key={`item-${i}`} onClick={navigate}>
				{i}
			</button>
		);
	}

	if (current !== pages && pages > 2 && current !== pages - 1 && current + 2 !== pages) {
		output.push(
			<button type="button" key="last" data-page={pages} onClick={navigate} className="pager-item ">
				{pages}
			</button>
		);
	}

	const cleanedPages = pages !== 0 && !pages ? 0 : pages;
	const showingPage = `${texts.page} ${current} ${texts.of} ${cleanedPages}`;

	return (
		<div className="jview-component-pager">
			<div className="content-pager">
				<ShorcutLink
					data-page={1}
					label="<<"
					className="pager-item first-page"
					condition={pages > 1 && current > 2}
				/>
				<ShorcutLink
					data-page={current - 1}
					label="<"
					className="pager-item prev-page"
					condition={pages > 1 && current > 1}
				/>
				{output}
				<ShorcutLink
					data-page={current + 1}
					label=">"
					className="pager-item next-page"
					condition={pages > 1 && current !== pages}
				/>
				<ShorcutLink
					data-page={pages}
					label=">>"
					className="pager-item next-page"
					condition={pages > 1 && current !== pages}
				/>
			</div>
		</div>
	);
}
