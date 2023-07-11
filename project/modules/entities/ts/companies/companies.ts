import {Collection} from '@beyond-js/reactive-2/entities';
import {CompaniesBridge} from 'trade-market/entities.bridge';
import {Company} from './company';
import config from 'trade-market/config';

export /*bundle*/ class Companies extends Collection {
	item = Company;

	constructor() {
		super({
			provider: CompaniesBridge,
			storeName: 'companies',
			db: config.params.application.localDB,
			localdb: true,
		});
	}
}
