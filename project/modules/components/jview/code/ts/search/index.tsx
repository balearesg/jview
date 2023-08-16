import React from "react";
import { SearchContext } from "./context";
import {
	useState,
	useEffect,
	useRef,
	MutableRefObject,
	PropsWithChildren,
} from "react";
import { View } from "./view";
import { useJViewContext } from "../context";

type filter = {
	id: string;
	name: string;
	identifier?: string;
};

interface props {
	filter?: Array<filter>;
	initValues: { [x: string]: string };
	onSearch?: (params: { [x: string]: string }) => Promise<void>;
	onClear?: () => Promise<void>;
	isClear?: boolean;
	placeholder?: string;
	type?: string;
	date?: boolean;
	dialogTitle?: string;
	searchableList?: boolean;
}

export /*bundle*/ function Search(
	props: PropsWithChildren<props>
): JSX.Element {
	const {
		dialogTitle,
		filter,
		initValues,
		children,
		onSearch,
		onClear,
		isClear,
		placeholder,
		type,
		date,
		searchableList,
	} = props;
	const ref: MutableRefObject<HTMLFieldSetElement> =
		useRef<HTMLFieldSetElement>(null);

	const button: MutableRefObject<HTMLButtonElement> =
		useRef<HTMLButtonElement>(null);
	const initialState = Object.assign(
		{
			startDate: "",
			endDate: "",
			search: "",
		},
		initValues
	);
	const { texts: { search: texts } } = useJViewContext();
	const [state, setState] = useState(initialState);
	const [show, setShow] = useState(false);
	useEffect(() => {
		const handleClick = (event: any): void => {
			const { current }: MutableRefObject<HTMLFieldSetElement> = ref;

			const isSameNode: boolean = event.composedPath()[0] === current;
			const isAChildren: boolean = current?.contains(event.composedPath()[0]);

			const istButton: boolean =
				button.current?.isSameNode(event.composedPath()[0]) ||
				event.target.isSameNode(event.composedPath()[0]) ||
				event.currentTarget.isSameNode(event.composedPath()[0]);
			const isChildrenButton: boolean =
				button.current?.contains(event.composedPath()[0]) ||
				event.target.contains(event.composedPath()[0]) ||
				event.currentTarget.contains(event.composedPath()[0]);
			if (!isSameNode && !isAChildren && !istButton && !isChildrenButton) {
				setShow(false);
			}
		};
		document.addEventListener("click", handleClick);
		return (): void => document.removeEventListener("click", handleClick);
	}, []);
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
	};
	return (
		<SearchContext.Provider value={value}>
			<View element={children} />
		</SearchContext.Provider>
	);
}

Search.defaultProps = {
	type: "search"
};
