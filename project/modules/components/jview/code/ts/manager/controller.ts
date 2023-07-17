import { Events } from "@beyond-js/kernel/core";
import { JCall } from "jview/api";
import { propsController } from "../types";

export /*bundle*/
function Controller(props: propsController): void {
	const events: Events = new Events({bind: this});
	const triggerEvent = (event: string = 'change'): any => events.trigger(event);
	/*
	 * {total}  int total rows registries.
	 */
	const {total, rows, action} = props;
	let current: number = props.current ? props.current : 1;
	let entries: Array<any> = props.entries ? props.entries : [];

	Object.defineProperty(this, 'ready', {
		get: (): boolean => !!entries && !!total && !!rows,
	});

	let pages: number;
	if (total <= rows) pages = 1;
	else pages = Math.ceil(total / rows);

	let pager: boolean;
	Object.defineProperty(this, 'pages', {get: (): number => pages});
	Object.defineProperty(this, 'pager', {get: (): boolean => pager});
	Object.defineProperty(this, 'rows', {get: (): number => rows});
	Object.defineProperty(this, 'total', {get: (): number => total});
	Object.defineProperty(this, 'current', {
		get: () => current,
		set: value => (current = value),
	});
	Object.defineProperty(this, 'entries', {
		get: (): Array<any> => entries.slice(current - 1, current * rows),
	});

	let fetching: boolean;
	Object.defineProperty(this, 'fetching', {get: () => fetching});

	const caller: any = new JCall();
	const ajaxCall: (next: any) => Promise<any> = async (next: any): Promise<any> => {
		const response: any = await caller.get(action, {next: next, limit: rows});
		if (response.status !== 'ok' || !response.data) {
			console.warn('there is no data');
			return [];
		}
		return response.data;
	};

	/*
	 * Este metodo espera recibir la data de la llamada o del metodo que ejecuta
	 *
	 * @param page
	 * @param entries
	 * @returns {Promise<void>}
	 */
	this.getPage = async (page: number, entries: any[]): Promise<void> => {
		fetching = true;
		triggerEvent();

		if (page < current) {
			current = page;
			if (props.onPrev && typeof props.onPrev === 'function') {
				await props.onPrev(page);
			}
			fetching = false;
			triggerEvent();
			return;
		}

		const next: number = rows * current;
		const localItems: number = entries.length;

		if (localItems > next) {
			current = page;
			fetching = false;
			triggerEvent();
			return;
		}
	
		const call: Function = props.onNext ?? ajaxCall;
		const data: any = await call(next, page);
		entries = data;
		current = page;

		fetching = false;
		triggerEvent();
	};
}
