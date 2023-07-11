import {Item} from '@beyond-js/reactive-2/entities';
import {DistributorBridge} from 'trade-market/entities.bridge';
import config from 'trade-market/config';

export /*bundle*/ class Distributor extends Item<Distributor> {
	protected properties = ['id', 'name', 'businessName', 'phone', 'distributionId'];
	id: number;
	name: string;
	businessName: string;
	phone: string | null | undefined;

	constructor(params: {id: string | undefined} = {id: undefined}) {
		super({
			provider: DistributorBridge,
			storeName: 'distributors',
			db: config.params.application.localDB,
			...params,
		});

		this.init();
	}
}
