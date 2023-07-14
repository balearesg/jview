import React from 'react';
import {Input} from '@bg/jview/input';
import {BeyondButton, BeyondForm} from '@bgroup/ui/form';
import {BeyondIconButton} from '@bgroup/ui/icons';

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

	const {onSearch, onReset, label, className, ...inputProps} = props;

	const clsDefault = `jview-search-bar ${className}`;

	return (
		<BeyondForm className={clsDefault} onSubmit={handleSubmit}>
			<div className="search-border">
				<Input placeholder="Buscar..." {...inputProps} className="search-input" max={`${inputProps.max}`} />
				<BeyondIconButton type="reset" onClick={onReset} icon="close" />
			</div>
			<BeyondButton icon="search" type="submit" className="btn btn-primary" label={label} />
		</BeyondForm>
	);
}
