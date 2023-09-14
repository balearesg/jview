import React, { useState, useEffect } from 'react';
import { JViewContext } from './context';
import { View } from './view';
import { module } from 'beyond_context';
import { useTexts } from 'jview/hooks';
import { Manager } from './manager';
import { TProps, TPropsController, TState } from './types';
export /*bundle*/
	function JView(props: TProps) {
	const { rows, onPrev, onNext, action }: TProps = props;
	const propsController: TPropsController = {
		total: props.total,
		rows,
		action,
		current: props.current,
		entries: props.entries,
		onPrev,
		onNext,
	};
	const [state, setState] = useState<TState>({});
	let [total, setTotal] = useState<number>(props.total);
	let [entries, setEntries] = useState<Array<any>>(props.entries);
	const [current, setCurrent] = useState<number>(props.currentPage ?? 1);
	const [pages, setPages] = useState();
	const [ready, texts] = useTexts<any>(module.specifier);
	useEffect(() => {
		const update = (specs: object = {}): void => {
			setState({ ...state, ...specs, controller });
			const page = typeof controller.current === 'string' ? parseInt(controller.current) : controller.current;
			setCurrent(page);
		};
		const controller: any = new Manager(propsController);
		controller.bind('change', update);
		update();
		return () => controller.unbind('change', update);
	}, []);

	useEffect((): void => {
		if (props.total !== total) {
			setTotal(props.total);
			if (state.controller) state.controller.current = 1;
			setCurrent(1);
		}

		setTimeout(() => {
			if (props.currentPage) {
				if (state?.controller) state.controller.current = props.currentPage;
				const page = typeof props.currentPage === 'string' ? parseInt(props.currentPage) : props.currentPage;
				setCurrent(page);
			}
		}, 500);

		setEntries(props.entries);
	}, [props.total, props.entries, props.currentPage]);


	if (!state.controller || !ready) return null;

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
		fetching: state.controller.fetching,
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
