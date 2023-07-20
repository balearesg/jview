import {ReactiveModel} from '@beyond-js/reactive/model';
import {Companies} from 'jview/entities.ts';

export class Store extends ReactiveModel<Store> {
	#collection: Companies = new Companies();
	get collection() {
		return this.#collection;
	}

	get items() {
		return this.#collection.items;
	}

	#limit: number = 10;
	get limit() {
		return this.#limit;
	}

	#params: any = {
		limit: this.#limit,
		start: 0,
	};

	load = async ({limit}: {limit: string}) => {
		try {
			this.fetching = true;
			this.#limit = Number(limit);
			const response = await this.#collection.load({...this.#params, limit: this.#limit});
			if (!response.status) throw new Error(response.error);
		} catch (error) {
			console.error('error', error);
		} finally {
			this.fetching = false;
		}
	};

	search = async (searchValue: string) => {
		try {
			this.fetching = true;
			const response = await this.#collection.load({
				limit: this.#limit,
				where: {name: searchValue, businessName: searchValue},
			});
			if (!response?.status) throw response.error;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};

	navigation = async ({page}) => {
		try {
			this.fetching = true;
			this.#params = {
				...this.#params,
				limit: this.#limit,
				start: this.#limit * (page - 1),
			};
			const response = await this.#collection.load(this.#params);
			if (!response.status) throw new Error(response.error);
			return this.#collection.items;
		} catch (error) {
			console.error('error', error);
		} finally {
			this.fetching = false;
		}
	};

	hide = () => this.#collection.off('change');
}
