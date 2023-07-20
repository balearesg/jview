import {CloudCross} from 'iconsax-react';
import React from 'react';
import {useTableViewContext} from './context';

export function Empty() {
	const {empty} = useTableViewContext();
	const Icon = empty?.icon || CloudCross;
	const label = empty?.label || 'We were unable to find the information you requested.';

	return (
		<div className="empty">
			<Icon className="icon" />
			<p>{label}</p>
		</div>
	);
}
