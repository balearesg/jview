import React from 'react';
import { useTableViewContext } from './context';
import {Add} from 'iconsax-react';
import {Button} from 'pragmate-ui//form';
import {Searchbar} from './searchbar';

export function Header() {
	const {title, searchbar, dateInput, addButton} = useTableViewContext();

	return (
		<header>
			<h2>{title}</h2>
			<div className="right d-flex gap-25px">
				<Searchbar {...searchbar} />
				{addButton && (
					<Button className={`primary-btn add-button ${addButton.className}`} {...addButton}>
						<Add />
					</Button>
				)}
			</div>
		</header>
	);
}
