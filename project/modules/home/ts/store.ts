import {ReactiveModel} from '@beyond-js/reactive/model';
import {Companies} from 'jview/entities.ts';

export class Store extends ReactiveModel<Store> {
	#collection: Companies = new Companies();
	get collection() {
		return this.#collection;
	}

	#limit: number = 10;
	get limit() {
		return this.#limit;
	}

	constructor() {
		super();
		this.#collection.on('change', this.triggerEvent);
	}

	load = async ({limit}: {limit: number}) => {
		try {
			this.fetching = true;
			this.#limit = limit;
			const response = await this.#collection.load({limit});
		} catch (error) {
			console.error(error);
		} finally {
			this.fetching = false;
		}
	};

	search = async (searchValue: string) => {
		this.#collection.load({where: {name: searchValue, businessName: searchValue}});
	};

	onPaginatorChange = ({page, limit, next}) => {
		this.#collection.load({limit, next});
	};

	hide = () => {
		this.#collection.off('change');
	};
}
