import {ReactiveModel} from '@beyond-js/reactive/model';
import {Companies} from '@bg/jview/entities.ts';

export class Store extends ReactiveModel<{}> {
	#collection = new Companies();
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
			this.fetching = true;
			const response = await this.#collection.load(this.#params);
			console.log(response, this.#collection.items);
			if (!response.status) throw new Error(response.error);
		} catch (error) {
			console.log('error', error);
		} finally {
			this.ready = true;
			this.fetching = false;
		}
	};

	#navigation = async page => {
		try {
			this.fetching = true;
			this.#params = {
				...this.#params,
				limit: this.#limit,
				start: this.#limit * (page - 1),
			};
			const response = await this.#collection.load(this.#params);
			if (!response.status) throw new Error(response.error);
			this.#currentPage = page;
			this.triggerEvent();
			return this.#collection.items;
		} catch (error) {
			console.error('error', error);
		} finally {
			this.fetching = false;
		}
	};

	search = async (searchValue: string) => {
		try {
			console.log('SEARCHVALUE => ', searchValue);
			this.fetching = true;
			const response = await this.#collection.load({name: searchValue, businessName: searchValue});
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

	hide = () => this.#collection.off('change');
}
