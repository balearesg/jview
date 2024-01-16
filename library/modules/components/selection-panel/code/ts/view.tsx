import React, { SyntheticEvent } from 'react';
import { IconButton } from 'pragmate-ui/icons';
import { Select } from "@bgroup/jview/select"
import { usePanelContext } from './context';
import { IValues } from './types';
import { Search } from './search';
import { SelectAll } from './select-all';
import { Message } from './message';
import { Buttons } from './buttons';
import { iconPanel } from './icon';
import { customHooks } from './hooks/cutom-hooks';
import { Checkboxes } from './checkbox';

export function View(): JSX.Element {
	customHooks()
	const { container, setShow, setStates, setValues, show, values, setInit, save, states, entity, select, configList, max, keyConf, setConfigList } =
		usePanelContext();
	const handleClick = (): void => setShow(!show);
	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, Event>): Promise<void> => {
		event.preventDefault();

		const validCheck: boolean = states.items.some((table): boolean => values[table.id] === true);

		if (!validCheck) return;
		const newConfig: Array<IValues> = states.items.filter((table): boolean => values[table.id] === true);

		if (entity) localStorage.setItem(entity, JSON.stringify(newConfig));
		save && save(newConfig);
		setInit({ ...values });
		setShow(false);
	};
	const cls: string = show ? 'show content-selection' : 'hide-selection content-selection';

	const clear = (): void => {
		states.items.forEach(table => {
			values[table.id] = false;
		});
		setValues({ ...values, all: false, search: '' });
		setStates({ ...states, items: states.originalItems, count: states.count + 1 });
	};
	const handleSelect = (item) => {
		const items = JSON.parse(item.value);
		const specs = { all: items.length === max, search: values.search };
		items.forEach(table => {
			specs[table.id ?? table.key] = table.checked;
		});
		setStates({ ...states, items })
		setValues({ ...specs })
	};

	const deleteOption = (options) => {

		localStorage.setItem(keyConf, JSON.stringify(options))
		setConfigList({ ...configList, options, new: false });
	};

	return (
		<div ref={container} className="container-selection">
			<span className="tooltip-item bottom" data-tooltip="Panel de selección">
				<IconButton
					{...iconPanel}
					onClick={handleClick}
					className="icon-header button-panel"
					data-tooltip="Panel de selección"
				/>
			</span>

			<form className={cls} autoComplete="off" onSubmit={handleSubmit}>
				{!!select && <Select id="panel-select" options={configList.options} onChange={handleSelect} deleteOption={deleteOption} />}
				<Search />
				<div className="all-clear">
					<SelectAll />
					<div className="item-clear">
						<IconButton icon="close" onClick={clear} />
						<span onClick={clear}>Limpiar</span>
					</div>
				</div>
				<div className="content-items">
					<Checkboxes />
				</div>
				<Message />
				<Buttons />
			</form>
		</div>
	);
}
