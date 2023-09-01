import { ReactiveModel } from '@beyond-js/reactive/model';
import { Companies } from 'jview/entities.ts';

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
		start: null,
	};

	load = async ({ limit }: { limit: string }) => {
		try {
			this.fetching = true;
			this.#limit = limit ? Number(limit) : 10;
			const response = await this.#collection.load({ ...this.#params, limit: this.#limit });
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
				where: { name: searchValue, businessName: searchValue },
			});
			if (!response?.status) throw response.error;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};

	navigation = async ({ next }) => {
		try {
			this.fetching = true;
			this.#params = {
				...this.#params,
				limit: this.#limit,
				start: next,
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
