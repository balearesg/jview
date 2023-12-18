import React, { MouseEvent } from 'react';
import { SelectionPanel } from '@bggroup/jview/selection-panel';
import { useJViewContext } from './context';
import { Button } from 'pragmate-ui/components';
import { Search } from './search';

export function Header() {
	const { title, search, actions, panel, texts } = useJViewContext();

	const clsHeader = ((!!actions?.create && !!actions?.create?.label) || !!panel) || !!search ? 'search-create' : 'search-create header-top';

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		const { action } = event.currentTarget.dataset;
		if (!actions[action] || !actions[action]?.onClick || typeof actions[action]?.onClick !== 'function') return;
		actions[action].onClick(event);
	};

	return (
		<header>
			{title && <h4 className="title-jview">{title}:</h4>}
			<div className={clsHeader}>
				<Search {...search} />
				<div className="d-flex head-buttons">
					{!!panel && <SelectionPanel {...panel} />}
					{actions?.export && (
						<Button
							label={texts.export}
							className="btn btn-primary create-button"
							onClick={handleClick}
							data-action="export"
						/>
					)}
					{!!actions?.create && (
						<Button
							onClick={handleClick}
							label={actions?.create.label}
							data-action="create"
							className="btn btn-primary create-button"
						/>
					)}
				</div>
			</div>
		</header>
	);
}
