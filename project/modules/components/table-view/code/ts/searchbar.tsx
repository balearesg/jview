import {CloseSquare, SearchNormal1} from 'iconsax-react';
import React from 'react';

export interface IProps extends React.AllHTMLAttributes<HTMLInputElement> {
	onSearch: React.FormEventHandler<HTMLFormElement>;
	onResetInput?: React.MouseEventHandler<HTMLButtonElement>;
}

export /*bundle*/ function Searchbar({onSearch, onResetInput, ...props}: IProps) {
	const displayReset = props.value;

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (onSearch && typeof onSearch === 'function') onSearch(event);
	};

	return (
		<form className="searchbar" onSubmit={onSubmit}>
			<input type="text" placeholder="Search..." {...props} />
			<div className="icons-container">
				{displayReset && (
					<button onClick={onResetInput} type="reset">
						<CloseSquare className="icon" />
					</button>
				)}
				<SearchNormal1 className="icon" />
			</div>
		</form>
	);
}
