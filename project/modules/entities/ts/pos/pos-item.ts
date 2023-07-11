import {Item} from '@beyond-js/reactive-2/entities';
import {PosItemBridge} from 'trade-market/entities.bridge';
import config from 'trade-market/config';
import {Distributor} from '../distributors/distributor';
import {Chain} from '../chains/chain';

interface ILoadParams {
	distributor?: number | boolean | undefined;
	chain?: number | boolean | undefined;
}
interface IItem {
	id: number;
	active: number;
	name: string;
	businessName: string;
	contact: string;
	lat: string;
	lng: string;
	placeId: string;
	locality: string;
	sublocality: string;
	formattedAddress: string;
	administrativeAreaLevel1: string;
	administrativeAreaLevel2: string;
	cigarCase: string;
	emailContact: string;
	phone: string;
	country: string;
	status: number;
	statusHave: number;
	distributorId: number;
	chainId: number;
	surveyStatus: number;
	posImage: string;
	timeInserted: string;
	ownerId: string | number;
}
export /*bundle*/ class PosItem extends Item<IItem> {
	protected properties = [
		'id',
		'name',
		'businessName',
		'contact',
		'lat',
		'lng',
		'placeId',
		'locality',
		'sublocality',
		'formattedAddress',
		'administrativeAreaLevel1',
		'administrativeAreaLevel2',
		'cigarCase',
		'emailContact',
		'phone',
		'country',
		'status',
		'statusHave',
		'distributorId',
		'chainId',
		'surveyStatus',
		'posImage',
		'active',
		'timeInserted',
		'ownerId',
	];

	#surveyStatus: number = 1;
	get surveyStatus() {
		return this.#surveyStatus;
	}
	set surveyStatus(value) {
		this.#surveyStatus = value;
		this.triggerEvent();
	}

	protected db = config.params.application.localDB;
	#distributor: Distributor;
	get distributor() {
		return this.#distributor;
	}

	set distributor(value) {
		this.#distributor = value;
		this.triggerEvent();
	}

	#chain: Chain;
	get chain() {
		return this.#chain;
	}
	set chain(value) {
		this.#chain = value;
		this.triggerEvent();
	}

	constructor(params: {id: string | undefined} = {id: undefined}) {
		super({
			provider: PosItemBridge,
			storeName: 'pos',
			db: config.params.application.localDB,
			...params,
		});

		this.init();
	}

	async checkIn(params = {}) {
		try {
			this.fetching = true;
			this.triggerEvent();

			const response = await this.provider.checkIn(params);
			if (!response.status) throw response.error;

			return response;
		} catch (exc) {
			console.error('ERROR CHECK IN', exc);
			return {status: false, error: exc};
		} finally {
			this.fetching = false;
			this.triggerEvent();
		}
	}

	loadData = async (params, includes: ILoadParams = {}) => {
		const response = await this.load();

		this.fetching = true;

		if (includes['distributor']) await this.loadDistributor();
		if (includes['chain']) await this.loadChain();

		this.fetching = false;
		return {status: true};
	};

	async loadChain() {
		if (!this.chainId) return false;

		this.#chain = new Chain({id: this.chainId});
		const response = await this.#chain.load();

		this.triggerEvent();
		return response;
	}

	addChain = async (id: string | number, opts: {publish: boolean} = {publish: false}) => {
		this.chainId = id;

		const response = await this.loadChain();
		if (!response.status) return;
		if (opts.publish) return this.publish();
	};

	async loadDistributor() {
		if (!this.distributorId) return false;
		this.#distributor = new Distributor({id: this.distributorId});
		const response = await this.#distributor.load();
		this.triggerEvent();
		return response;
	}

	addDistributor = async (id: string | number, opts: {publish: boolean} = {publish: false}) => {
		this.distributorId = id;

		const response = await this.loadDistributor();
		if (!response.status) return;

		if (opts.publish) return this.publish();
	};
}
