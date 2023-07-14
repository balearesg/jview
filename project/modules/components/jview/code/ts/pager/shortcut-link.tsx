import * as React from 'react';
import {useJViewContext} from '../context';
export function ShorcutLink(props) {
	const {state, entries, fetching} = useJViewContext();

	const navigate = (event: React.SyntheticEvent<HTMLLIElement, Event>) => {
		const target: EventTarget & HTMLLIElement = event.currentTarget as HTMLLIElement;
		const {page} = target.dataset;
		console.log({controller: state.controller, page, entries});
		state.controller.getPage(page ?? parseInt(page), entries);
	};

	const {condition, label} = props;

	if (!condition) return null;
	const attrs = {...props};
	['condition', 'label'].forEach(attr => delete attrs[attr]);

	return (
		<button disabled={fetching} onClick={navigate} {...attrs}>
			{label}
		</button>
	);
}
