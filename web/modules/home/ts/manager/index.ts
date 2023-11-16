import { ReactiveModel } from '@beyond-js/reactive/model';
import { Companies } from '@jview/web/entities.ts';
import config from '@jview/web/config';
import { head } from '../views/keys';

export class Manager extends ReactiveModel<Manager> {
	#collection = new Companies();
	get collection() {
		return this.#collection;
	}

	#limit: number = config.params.application.tables.rows;
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

	#heads;
	get heads() {
		return this.#heads;
	}
	set heads(value) {
		this.#heads = value;
		this.triggerEvent();
	};

	constructor() {
		super();
		const confTables = !!localStorage.getItem('jview')
			? JSON.parse(localStorage.getItem('jview'))
			: head.slice(0, 9);
		this.#heads = confTables;
	}

	load = async () => {
		this.fetching = true
		try {
			this.#params = {
				limit: this.#limit,
				order: 'timeUpdated',
				des: 'DES',
				additionalOperand: '7',
			};

			const response = await this.#collection.load(this.#params);

			if (!response.status) throw new Error(response.error.message);
		} catch (error) {
			console.error('error', error);
		} finally {
			this.ready = true;
			this.fetching = false
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
			if (!response.status) throw response.error;
			this.#currentPage = page;
			this.triggerEvent();
			return this.#collection.items;
		} catch (error) {
			console.error('error', error);
		}
	};

	search = async params => {
		try {
			this.fetching = true;
			this.#params = {
				...this.#params,
				where: { name: params.search, businessName: params.search },
				start: 0,
			};

			const response = await this.#collection.load(this.#params);
			if (!response?.status) throw response.error;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};

	changeEntries = async ({ limit, total, pages }): Promise<number> => {
		this.fetching = true;
		const newPages = Math.ceil(total / limit);
		this.#currentPage = Math.min(Math.ceil((this.#currentPage * this.#limit) / limit), newPages);
		this.#limit = limit;
		this.#params = {
			...this.#params,
			limit: this.#limit,
			start: (this.#currentPage - 1) * limit,
		};
		await this.#collection.load(this.#params);
		this.#currentPage = Math.min(this.#currentPage, pages);
		this.fetching = false;
		this.triggerEvent();
		return this.#currentPage;
	};

	changeOrder = (event) => {
		// const {
		//   dataset: { key },
		// } = event.currentTarget;

		// const sort = (a, b) => {
		//   if (!a[key] || !b[key]) return;
		//   if (this.#reverse[key])
		// 	return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
		//   return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
		// };
		// this.#items = this.#collection.items.sort(sort);
		// this.#reverse[key] = !this.#reverse[key];
		// this.triggerEvent();
	};

	next = (next, page) => this.#navigation(page);

	prev = page => this.#navigation(page);
}
