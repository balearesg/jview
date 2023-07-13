import * as React from 'react';
import {JViewTab} from './views/jview';

export /*bundle*/
function View({store}) {
	return (
		<div className="page__container">
			<JViewTab store={store} />
		</div>
	);
}
