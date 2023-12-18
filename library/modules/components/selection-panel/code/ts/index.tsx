import React, { useRef, useState, MutableRefObject } from "react";
import { PanelContext } from "./context";
import { View } from "./view";
import { IProps, IState, IValues } from "./types";
import { New } from "./confi-list/new";

export /*bundle*/ function SelectionPanel(props: IProps): JSX.Element {
	const { tables, entity } = props;

	const [show, setShow] = useState<boolean>(false);

	const [init, setInit] = useState<IValues>({ search: "", all: false });

	const [values, setValues] = useState<IValues>({ search: "", all: false });

	const tablesLocal = localStorage.getItem(`tables-${entity}`)
	const tablesStorage = !!tablesLocal ? [...JSON.parse(tablesLocal)] : [...tables]

	const [states, setStates] = useState<IState>({
		items: structuredClone([...tablesStorage]),
		originalItems: structuredClone([...tables]),
		count: 0,
	});

	const keyConf = `conf-${entity}`;
	const prevStorage = localStorage.getItem(keyConf);
	const storage = prevStorage ? JSON.parse(prevStorage) : [];

	const options = storage.map(item => {
		return {
			value: JSON.stringify(item.items),
			label: item.name
		}
	});

	const [configList, setConfigList] = React.useState({
		options,
		selected: {},
		new: false,
	});

	const container: MutableRefObject<HTMLDivElement> =
		useRef<HTMLDivElement>(null);

	const handleModal = () => setConfigList({ ...configList, new: !configList.new })

	const value = {
		values,
		setValues,
		states,
		setStates,
		show,
		setShow,
		container,
		setInit,
		init,
		configList,
		setConfigList,
		handleModal,
		keyConf,
		new: configList.new,
		...props,
		tables
	};
	return (
		<PanelContext.Provider value={value}>
			<View />
			<New />
		</PanelContext.Provider>
	);
}

SelectionPanel.defaultProps = {
	entity: "operations",
	max: 9,
	isMax: true,
	selectAll: true,
};
