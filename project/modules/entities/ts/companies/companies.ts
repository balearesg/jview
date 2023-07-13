import { Collection } from '@beyond-js/reactive-2/entities';
import { CompaniesBridge } from 'jview/bridges/companies';
import { Company } from './company';
import config from 'jview/config';
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
