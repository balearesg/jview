import {Collection} from '@beyond-js/reactive-2/entities';
import {DistributorsBridge} from 'trade-market/entities.bridge';
import {Distributor} from './distributor';
import config from 'trade-market/config';

export /*bundle*/ class Distributors extends Collection {
	item = Distributor;

	constructor() {
		super({
			provider: DistributorsBridge,
			storeName: 'distributors',
			db: config.params.application.localDB,
			localdb: true,
		});
		this.init();
	}
}
