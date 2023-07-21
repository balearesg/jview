import * as React from 'react';
import {Table} from './table';
import {Store} from '../store';

export /*bundle*/
function View({store}: {store: Store}): JSX.Element {
	return (
		<div className="page__container">
			<section className="container__table">
				<Table store={store} />
			</section>
		</div>
	);
}
