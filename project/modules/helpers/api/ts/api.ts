import {JCall} from './jcall'

export  /*bundle*/
class Api {

    async action(method = 'get', route: string, specs: object = {}): Promise<any> {
        const call: void = new JCall();
        return call[method](this.getURL(route), specs)
    }

    getURL(route: string): string {
        return route;
    }

    get(route: string, specs?: object): Promise<any> {
        return this.action('get', route, specs);
    }

    post(route: string, specs: object): Promise<any> {
        return this.action('post', route, specs);
    }

}
