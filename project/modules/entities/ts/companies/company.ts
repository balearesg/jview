import {Item} from '@beyond-js/reactive-2/entities';
import {CompanyBridge} from 'jview/entities.bridge';
import config from 'jview/config';

export /*bundle*/ class Company extends Item<Company> {
	protected properties = ['id', 'name', 'businessName'];
	id: number;
	name: string;
	businessName: string;

	constructor(params: {id: string | undefined} = {id: undefined}) {
		super({
			provider: CompanyBridge,
			storeName: 'companies',
			db: config.params.application.localDB,
			...params,
		});

		this.init();
	}
}
