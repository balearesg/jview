import React from "react";
import { Button, Form } from "pragmate-ui/form";
import { IconButton } from "pragmate-ui/icons";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onSearch: (value) => void;
	onReset: () => void;
	label?: string;
	className?: string;
}
export /*bundle*/ function Searchbar(props: IProps) {
	function handleSubmit() {
		props.onSearch(props.value);
	}

	const { onSearch, onReset, label, className, ...inputProps } = props;

	const clsDefault = `search ${className}`;
	const displayReset = inputProps.value;

	return (
		<Form className={clsDefault} onSubmit={handleSubmit}>
			<div className="content-search">
				<input
					placeholder="Buscar..."
					{...inputProps}
					className="search-input"
					max={`${inputProps.max}`}
				/>
				{displayReset && (
					<IconButton type="reset" onClick={onReset} icon="close" />
				)}
				<IconButton
					icon="search"
					type="submit"
					className="icon-search"
				/>
			</div>
		</Form>
	);
}
