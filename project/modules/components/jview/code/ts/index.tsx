import React, { useState } from 'react';
import { JViewContext } from './context';
import { View } from './view';
import { module } from 'beyond_context';
import { useTexts } from 'jview/hooks';
import { TProps, TState } from './types';
export /*bundle*/
	function JView(props: TProps) {
	const [state, setState] = useState<TState>({});
	let [total, setTotal] = useState<number>(props.total);
	let [entries, setEntries] = useState<Array<any>>(props.entries);
	const [current, setCurrent] = useState<number>(props.currentPage ?? 1);
	const [pages, setPages] = useState();
	const [ready, texts] = useTexts<any>(module.specifier);

	const value = {
		...props,
		state,
		props,
		current,
		pages,
		total,
		entries,
		setPages,
		loading: props.loading,
		texts,
		fetching: state?.controller?.fetching,
		setTotal,
		setEntries,
		setState,
		setCurrent,
		ready
	};
	return (
		<JViewContext.Provider value={value}>
			<View />
		</JViewContext.Provider>
	);
}

JView.defaultProps = {
	showSelect: true,
};
