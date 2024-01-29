import { ReactiveModel } from "@beyond-js/reactive/model";
import { JCall } from "@bgroup/jview/api";
import { TPropsController } from "../interfaces";
export /*bundle*/
    class Manager extends ReactiveModel<Manager> {
    #total;
    get total() {
        return this.#total;
    };
    set total(value: number) {
        this.#total = value
    }
    #rows;
    get rows() {
        return this.#rows;
    }
    #action;
    get action() {
        return this.#action;
    }
    #current;
    get current() {
        return this.#current;
    }
    set current(value) {
        if (value === this.#current) return;
        this.#current = value;
        this.triggerEvent();
    }
    #entries = [];
    #allEntries = [];
    get entries() {
        return this.#entries.slice(this.#current - 1, this.#current * this.#rows);
    }

    ready = !this.entries && !!this.total && !!this.rows;

    #pages: number;
    get pages() {
        return this.#pages;
    }

    #pager: number;
    get pager() {
        return this.#pager;
    }

    #onPrev;
    #onNext;
    #caller: any = new JCall();
    #props

    #reverse = {};

    icon = (key: string) => {
        return this.#reverse[key] ? "arrowDropUp" : "arrowDropDown";
    };

    constructor(props: TPropsController) {
        super();
        const { total, rows, action, current, entries, onNext, onPrev, dataHead } = props;
        this.#total = total;
        this.#rows = rows;
        this.#action = action;
        this.#current = current ?? 1;
        this.#entries = entries ?? [];
        this.#allEntries = entries ?? [];
        if (total <= rows) this.#pages = 1;
        else this.#pages = Math.ceil(total / rows);
        this.#onNext = onNext;
        this.#onPrev = onPrev;
        if (dataHead && Array.isArray(dataHead)) {
            dataHead.forEach(item => this.#reverse[item.id] = false);
        };
        this.#props = props;
    }
    #ajaxCall: (next: any) => Promise<any> = async (next: any): Promise<any> => {
        const response: any = await this.#caller.get(this.#action, {
            next: next,
            limit: this.#rows,
        });
        if (response.status !== "ok" || !response.data) {
            console.warn("there is no data");
            return [];
        }
        return response.data;
    };

    changeOrder = (event) => {
        const {
            dataset: { key },
        } = event.currentTarget;
        const sort = (a, b) => {
            if (!a[key] || !b[key]) return;
            if (this.#reverse[key])
                return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
            return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
        };
        this.#entries = this.#allEntries.sort(sort);
        this.#reverse[key] = !this.#reverse[key];
        this.triggerEvent();
    };

    /*
     * Este metodo espera recibir la data de la llamada o del metodo que ejecuta
     *
     * @param page
     * @param entries
     * @returns {Promise<void>}
     */
    getPage = async (page: number, entries: any[]): Promise<void> => {
        this.fetching = true;
        this.triggerEvent();

        if (page < this.#current) {
            this.#current = page;
            if (this.#onPrev && typeof this.#onPrev === "function") {
                await this.#onPrev({ page });
            }
            this.fetching = false;
            this.triggerEvent();
            return;
        }

        const next: number = this.#rows * this.#current;
        const localItems: number = entries.length;

        if (localItems > next) {
            this.#current = page;
            this.fetching = false;
            this.triggerEvent();
            return;
        }

        const call: Function = this.#onNext ?? this.#ajaxCall;
        const data: any = await call({ next, page });
        entries = data;
        this.#current = page;

        this.fetching = false;
        this.triggerEvent();
    };

    changeItems = async ({ limit: newLimit, pages: newPages }) => {
        this.#pages = newPages;
        this.#rows = newLimit;
        this.triggerEvent();
    };

    handleChangeRows = async ({ limit }): Promise<void> => {
        this.#rows = limit;
        let pages: number;
        if (this.#total <= limit) pages = 1;
        else pages = Math.ceil(this.#total / limit);
        this.#current = 1;
        this.#pages = pages;
        if (this.#props.load && typeof this.#props.load === "function") {
            const current = await this.#props.load({ limit, total: this.#total, pages });
            if (current) this.#current = parseInt(current)
        }
        this.triggerEvent();
    };
}
