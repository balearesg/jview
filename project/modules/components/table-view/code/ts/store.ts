import {ReactiveModel} from '@beyond-js/reactive/model';
import {Collection} from '@beyond-js/reactive/entities';
import {routing} from '@beyond-js/kernel/routing';
import {IPaginator} from './paginator/paginator';

interface IConstructor {
	page?: number;
	rows: number;
	collection: Collection;
	paginator: IPaginator;
}

export class Store extends ReactiveModel<Store> {
	#currentPage: number = 1;
	get currentPage() {
		return this.#currentPage;
	}

	#currentLength: number = 10;
	get currentLength() {
		return this.#currentLength;
	}

	get items() {
		return this.#collection.items;
	}

	#rows: number = 10;
	get rows() {
		return this.#rows;
	}

	get total() {
		return this.#collection.total;
	}

	get fetching() {
		return this.#collection.fetching;
	}

	#onPaginatorChange: (params: {page: number; next: number; limit: number; total: number}) => Promise<void>;
	#onLengthLimiterChange: (value: number) => void;

	#collection: Collection;

	constructor({page, rows, collection, paginator}: IConstructor) {
		super();

		if (page) this.#currentPage = page;
		this.#rows = rows;
		this.#onPaginatorChange = paginator.onChange;
		if (paginator.onLengthLimiterChange) this.#onLengthLimiterChange = paginator.onLengthLimiterChange;

		this.#collection = collection;
		this.#collection.on('change', this.triggerEvent);
	}

	onChange = async (page: number) => {
		const {next, total} = this.#collection;
		this.#updateUrl({page, limit: this.#rows});

		await this.#onPaginatorChange({page, next, limit: this.#rows, total});

		this.#currentPage = page;
		this.triggerEvent();
	};

	onLengthLimiterChange = async (value: number) => {
		this.#rows = value;
		if (this.#onLengthLimiterChange) this.#onLengthLimiterChange(value);
		this.onChange(this.#currentPage);
	};

	#updateUrl = ({page, limit}: {page: number; limit: number}) => {
		const searchParams = new URLSearchParams(routing.uri.search);

		for (const [key, value] of Object.entries({page, limit})) {
			if (!value) continue;

			if (searchParams.has(key)) {
				searchParams.set(key, value.toString());
			} else {
				searchParams.append(key, value.toString());
			}
		}

		const newUrl = `${routing.uri.pathname}?${searchParams}`;
		routing.pushState(newUrl);
	};
}
