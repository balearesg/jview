import {Collection} from '@beyond-js/reactive-2/entities';
import {CompaniesBridge} from '@bg/jview/bridges';
import {Company} from './company';
import config from '@bg/jview/config';
export /*bundle*/ class Companies extends Collection {
	item = Company;

	constructor() {
		super({
			provider: CompaniesBridge,
			storeName: 'companies',
			db: config.params.application.localDB,
			localdb: true,
		});

		this.init();
	}
}
