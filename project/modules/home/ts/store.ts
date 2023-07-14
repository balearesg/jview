import {ReactiveModel} from '@beyond-js/reactive/model';
import {Companies} from '@bg/jview/entities.ts';

export class Store extends ReactiveModel<{}> {
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

	constructor() {
		super();
		this.#collection.on('change', this.triggerEvent);
	}

	load = async () => {
		try {
			console.log(this.#params);
			const response = await this.#collection.load(this.#params);
			if (!response.status) throw new Error(response.error.message);
		} catch (error) {
			console.log('error', error);
		} finally {
			this.ready = true;
		}
	};

	#navigation = async page => {
		try {
			this.#params = {
				...this.#params,
				limit: this.#limit,
				start: this.#limit * (page - 1),
			};
			console.log(this.#params);
			const response = await this.#collection.load(this.#params);
			if (!response.status) throw new Error(response.error);
			this.#currentPage = page;
			this.triggerEvent();
			return this.#collection.items;
		} catch (error) {
			console.error('error', error);
		}
	};

	next = (next, page) => this.#navigation(page);

	prev = page => this.#navigation(page);
}
