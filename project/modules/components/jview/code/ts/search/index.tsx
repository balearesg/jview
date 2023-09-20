import * as React from 'react';
import { SearchContext } from './context';
import { Form } from './form';
import { useJViewContext } from '../context';
import { IProps } from './interfaces';
import { useOutsideClick } from './use-outside-click';
export /*bundle*/ function Search(props: React.PropsWithChildren<IProps>): JSX.Element {
	const {
		dialogTitle,
		filter,
		initValues,
		element,
		onSearch,
		onClear,
		isClear,
		placeholder,
		type,
		date,
		searchableList,
	} = props;
	const ref: React.MutableRefObject<HTMLFieldSetElement> = React.useRef<HTMLFieldSetElement>(null);

	const button: React.MutableRefObject<HTMLButtonElement> = React.useRef<HTMLButtonElement>(null);
	const initialState = Object.assign(
		{
			startDate: '',
			endDate: '',
			search: '',
		},
		initValues
	);
	const {
		texts: { search: texts },
		isSearch,
	} = useJViewContext();
	const [state, setState] = React.useState(initialState);
	const [show, setShow] = React.useState(false);
	useOutsideClick({ ref, button, setShow });
	if (!isSearch) return null;
	const handleChange = (event: React.ChangeEvent<HTMLElement>): void => {
		const target: HTMLInputElement & EventTarget = event.currentTarget as HTMLInputElement;
		setState({ ...state, [target.name]: target.value });
	};
	const isFilter: boolean = !!filter && Array.isArray(filter) && !!filter.length;
	const value = {
		state,
		show,
		setShow,
		setState,
		initValues,
		filter,
		button,
		ref,
		onSearch,
		onClear,
		isClear,
		placeholder,
		initialState,
		type,
		dialogTitle,
		date,
		searchableList,
		texts,
		element,
		handleChange,
		isFilter,
	};
	return (
		<SearchContext.Provider value={value}>
			<Form />
		</SearchContext.Provider>
	);
}

Search.defaultProps = {
	type: 'search',
};
