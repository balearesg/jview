import { Item } from '@beyond-js/reactive/entities';
import { CompanyBridge } from '@jview/web/bridges';
import config from '@jview/web/config';
export /*bundle*/ class Company extends Item<Company> {
	protected properties = ['id', 'name', 'businessName'];
	id: number;
	name: string;
	businessName: string;

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: CompanyBridge,
			storeName: 'companies',
			db: config.params.application.localDB,
			...params,
		});
	}
}
