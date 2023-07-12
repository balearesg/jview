import * as React from 'react';
import {TabsContent, BeyondTabs, Tabs} from 'pragmate-ui/tabs';
import {JViewTab} from './views/jview';
import {TableViewTab} from './views/table-view';

export /*bundle*/
function View({store}) {
	const [tab, setTab] = React.useState(1);

	return (
		<div className="page__container">
			<BeyondTabs selected={tab}>
				<Tabs selected={tab}>
					<button data-path="/components/beyond-tabs?tab=0" onClick={() => setTab(0)}>
						JView
					</button>
					<button data-path="/components/beyond-tabs?tab=1" onClick={() => setTab(1)}>
						Table view
					</button>
				</Tabs>
				<TabsContent>
					<JViewTab store={store} />
					<TableViewTab store={store} />
				</TabsContent>
			</BeyondTabs>
		</div>
	);
}
