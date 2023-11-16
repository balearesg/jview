import { Collection } from '@beyond-js/reactive/entities';
import { CompaniesBridge } from '@jview/web/bridges';
import { Company } from './company';
import config from '@jview/web/config';
export /*bundle*/ class Companies extends Collection {

	constructor() {
		super({
			provider: CompaniesBridge as any,
			storeName: 'companies',
			db: config.params.application.localDB,
			localdb: true,
			item: Company
		});

		this.init();
	}
}
