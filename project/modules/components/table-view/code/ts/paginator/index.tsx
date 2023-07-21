import React from 'react';
import {LengthLimiter} from './length-limiter';
import {Paginator} from './paginator';

export function Pager() {
	return (
		<div className="pager">
			<Paginator />
			<LengthLimiter />
		</div>
	);
}
