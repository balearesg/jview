import { ReactiveModel } from "@beyond-js/reactive/model";
import {Companies} from 'jview/entities.ts';

export class Manager extends ReactiveModel<{}> {
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
      console.log("🚀 ~ file: index.ts:27 ~ Manager ~ load= ~ this.#collection:", this.#collection)
      if (!response.status) throw new Error(response.error.message);
    } catch (error) {
      console.log("error", error);
    } finally {
      this.ready = true;
      this.triggerEvent();
    }
  };

  #navigation = async (page) => {
    try {
      this.#params = {
        ...this.#params,
        limit: this.#limit,
        start: this.#limit * (page - 1),
      };
      const response = await this.#collection.load(this.#params);
      if (!response.status) throw new Error(response.error.message);
      this.#currentPage = page;
      this.triggerEvent()
      return this.#collection.items;
    } catch (error) {
      console.error("error", error);
    }
  };

  next = (next, page) => this.#navigation(page);

  prev = (page) => this.#navigation(page);
}
