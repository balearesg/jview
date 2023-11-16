import React, { useReducer, useState, ChangeEvent } from "react";

type params<T> = {
	init: T;
	isDisabled?: boolean;
	onChange?: (e) => void;
};

type payload = {
	type: "reset" | "change" | "changes",
	name?: string,
	value?: string,
	data?: {
		[x: string | number]: any
	}
}

/**
 * It's a hook that returns an object with a bunch of functions that you can use to get the values of
 * your form fields, and to set the values of your form fields
 * @param  - params<T>
 * @returns An object with the following properties:
 * fields: T
 * onFieldChange: (event: ChangeEvent<any>) => void
 * getInput: (name?: string, label?: string, id?: string, disabled?: boolean) => getInput
 * getCheckbox: (name: string, disabled?: boolean) => getCheckbox
 * getRadio: (name: string, value: string
 */
export /*bundle*/
	function useForm<T>({ init, isDisabled, onChange }: params<T>) {
	const reducer = (state: T, payload: payload): T => {
		switch (payload.type) {
			case "reset":
				return init;
			case "change":
				return {
					...state,
					[payload.name]: payload.value,
				};
			case "changes":
				return {
					...state,
					...payload.data,
				};
			default:
				return;
		}
	};
	const [fields, dispatch] = useReducer(reducer, init);
	const [error, setError] = useState<any>({});

	const onFieldChange = (event: ChangeEvent<any>): void => {
		const { value, name, type, checked } = event.target;

		dispatch({
			name,
			value: type === "checkbox" ? checked : value,
			type: "change",
		});
		onChange && onChange(event.target);
		setError({});
	};
	type getInput = {
		name: string;
		value: string;
		onChange: (e: ChangeEvent<HTMLElement>) => void;
		label?: string;
		id?: string;
		disabled?: boolean;
	};
	type getCheckbox = {
		name: string;
		checked: boolean;
		onChange: (e: ChangeEvent<HTMLInputElement>) => void;
		disabled?: boolean;
		label: string
	};
	type getRadio = {
		name: string;
		label: string;
		onChange: (e: ChangeEvent<HTMLInputElement>) => void;
		value: string;
		checked: boolean;
		disabled?: boolean;
	};
	type getSelect = {
		name: string;
		value: string;
		onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
		disabled?: boolean;
	};

	return {
		fields,
		onFieldChange,
		getInput: (name?: string, label?: string, id?: string, disabled?: boolean): getInput => ({
			name,
			value: fields[name] ?? "",
			onChange: onFieldChange,
			label: label ?? name,
			id: name ?? id,
			disabled: disabled ?? isDisabled,
		}),
		getCheckbox: (name: string, label: string, disabled?: boolean): getCheckbox => ({
			name,
			checked: fields[name],
			onChange: onFieldChange,
			disabled: disabled ?? isDisabled,
			label: label
		}),
		getRadio: (name: string, value: string, label: string, disabled?: boolean): getRadio => ({
			name,
			value,
			checked: fields[name] === value,
			onChange: onFieldChange,
			label: label ?? value,
			disabled: disabled ?? isDisabled,
		}),
		getSelect: (name?: string, disabledField?: boolean): getSelect => {
			return {
				name,
				value: fields[name],
				onChange: onFieldChange,
				disabled: disabledField ?? isDisabled,
			};
		},
		error,
		setError,
		dispatch,
	};
};
