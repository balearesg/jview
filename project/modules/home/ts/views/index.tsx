import * as React from 'react';
import {Table} from './table';
import {useBinder} from '@bg/jview/hooks';
import {LoadingPage} from '@bg/jview/loading-page';
import {Store} from '../store';
export /*bundle*/
function Page({store: manager}: {store: Store}): JSX.Element {
	const [state, setState] = React.useState({});
	useBinder([manager], () => setState({}));
	if (!manager.ready) return <LoadingPage />;

	return (
		<div className="page__container">
			<section className="container__table">
				<Table manager={manager} />
			</section>
		</div>
	);
}
