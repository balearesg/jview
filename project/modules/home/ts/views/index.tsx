import * as React from 'react';
import {Table} from './table';
import {useBinder} from '@bg/jview/hooks';
import {LoadingPage} from '@bg/jview/loading-page';
import {Store} from '../store';
export /*bundle*/
function View({store}: {store: Store}): JSX.Element {
	const [state, setState] = React.useState(store);

	return (
		<div className="page__container">
			<section className="container__table">
				<Table store={store} />
			</section>
		</div>
	);
}
