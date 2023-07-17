import {ReactiveModel} from '@beyond-js/reactive/model';
import {Companies} from 'jview/entities.ts';

export class Manager extends ReactiveModel<Manager> {
	#collection = new Companies();
	get collection() {
		return this.#collection;
	}
	#limit: number = 10;
	get limit() {
		return this.#limit;
	}

	#params: any = {
		limit: this.#limit,
		start: 0,
	};

	#currentPage = 1;
	get currentPage(): number {
		return this.#currentPage;
	}

	load = async () => {
		try {
			const response = await this.#collection.load(this.#params);

			if (!response.status) throw new Error(response.error.message);
		} catch (error) {
			console.error('error', error);
		} finally {
			this.ready = true;
			this.triggerEvent();
		}
	};

	#navigation = async page => {
		try {
			this.#params = {
				...this.#params,
				limit: this.#limit,
				start: this.#limit * (page - 1),
			};
			const response = await this.#collection.load(this.#params);
			if (!response.status) throw new Error(response.error.message);
			this.#currentPage = page;
			this.triggerEvent();
			return this.#collection.items;
		} catch (error) {
			console.error('error', error);
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

	next = (next, page) => this.#navigation(page);

	prev = page => this.#navigation(page);
}
