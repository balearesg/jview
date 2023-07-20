import {PageReactWidgetController} from '@beyond-js/react-18-widgets/page';
import {View} from './views/index';
import {routing} from '@beyond-js/kernel/routing';
import {Store} from './store';

export /*bundle*/
class Controller extends PageReactWidgetController {
	get Widget() {
		return View;
	}

	#store: Store | undefined;

	createStore() {
		const store = new Store();
		this.#store = store;
		return this.#store;
	}

	show() {
		const limit = Number(routing.uri.qs.get('limit'));
		this.#store.load({limit});
	}

	hide() {
		this.#store.hide();
	}
}
