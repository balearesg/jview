import {Collection} from '@beyond-js/reactive-2/entities';
import {PosCollectionBridge} from 'trade-market/entities.bridge';
import {PosItem} from './pos-item';
import config from 'trade-market/config';
export /*bundle*/ class PosCollection extends Collection {
	protected sortBy = 'id';
	item = PosItem;

	constructor() {
		super({
			provider: PosCollectionBridge,
			storeName: 'pos',
			db: config.params.application.localDB,
			localdb: true,
		});

		this.init();
	}

	 loadData = async (specs: any = {}) => {
		
		const props = ['fromLat', 'toLat', 'fromLng', 'toLng'];
		if (specs.bounds) {
			props.forEach(prop => {
				if (!specs.bounds[prop]) return;

				specs.bounds[prop] = specs.bounds[prop].toString();
			});
		}

		const response = await this.load(specs);
		this.items = response.data.items;
		return response;
	}
}
