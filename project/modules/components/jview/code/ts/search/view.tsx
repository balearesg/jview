import React, { SyntheticEvent, ChangeEvent } from 'react';
import { Button } from "pragmate-ui/components";
import { Dates } from './dates';
import { useSearchContext } from './context';
import { IconButton } from "pragmate-ui/icons";
import { Input } from 'jview/input';
export function View({ element }): JSX.Element {
	const {
		state,
		setShow,
		show,
		setState,
		initialState,
		filter,
		button,
		ref,
		onSearch,
		onClear,
		isClear,
		placeholder,
		type,
		dialogTitle,
		searchableList,
		date,
		texts
	} = useSearchContext();

	const handleShow = (): void => setShow(!show);
	const cls: string = show ? 'show' : 'hide-fields';

	const handleSubmit = async (event: SyntheticEvent<HTMLElement, Event>): Promise<void> => {
		event.preventDefault();
		onSearch && (await onSearch(state));
		setShow(false);
	};

	const handleClear = async (event): Promise<void> => {
		event.stopPropagation();
		setState(initialState);
		onClear && (await onClear());
		setShow(false);
	};

	const handleChange = (event: ChangeEvent<HTMLElement>): void => {
		const target: HTMLInputElement & EventTarget = event.currentTarget as HTMLInputElement;
		setState({ ...state, [target.name]: target.value });
	};

	const isFilter: boolean = !!filter && Array.isArray(filter) && !!filter.length;

	const output: Array<JSX.Element> =
		isFilter &&
		filter.map((item): JSX.Element => {
			return (
				<Input
					key={item.id}
					type="text"
					name={item.identifier}
					label={item.name}
					value={state[item.identifier] ?? ''}
					onChange={handleChange}
				/>
			);
		});

	const isClearValues: boolean =
		(state.search) ||
		(isClear && Object.keys(state).some((item: string): boolean => !!state[item]));
	const clearableCls = isClearValues ? 'clearable' : 'not-clearable';
	const hide = () => setShow(false);
	return (
		<form onSubmit={handleSubmit} autoComplete="off" className="search-operations">
			<div className="content-search">
				<IconButton
					icon="search"
					className="icon-search"
					type="submit"
					onClick={handleSubmit}
				/>
				<input
					type={type}
					placeholder={placeholder ?? texts.search}
					value={state.search}
					name="search"
					onChange={handleChange}
				/>
				<div className="icon-buttons">
					{searchableList && (
						<IconButton
							icon="list-search"
							className="list-search"
							onClick={handleShow}
							ref={button}
						/>
					)}

					<IconButton
						icon="close"
						className={`close ${clearableCls}`}
						type="button"
						onClick={handleClear}
					/>
				</div>
			</div>
			<fieldset className={cls} ref={ref}>
				<div className="content-title">
					<span>{dialogTitle}</span>
					<IconButton icon="close" onClick={hide} />
				</div>
				<div className="content-inputs">
					{date && <Dates handleChange={handleChange} />}
					{element}
					{isFilter ? output : null}
				</div>

				<Button variant="primary" type="submit">{texts.accept}</Button>
			</fieldset>
		</form>
	);
}
