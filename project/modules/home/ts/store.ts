import {ReactiveModel} from '@beyond-js/reactive-2/model';
import {Companies} from 'jview/entities.ts'

export class Store extends ReactiveModel<Store>{
    #collection: Companies = new Companies();
    get collection () {
        return this.#collection
    }

    #limit: number = 10
    get limit () {
        return this.#limit
    }

    constructor() {
        super()
        this.#collection.on('change', this.triggerEvent)
    }

    load = async ({limit}: {limit: number}) => {
        try {
            this.#limit = limit
            const response = await this.#collection.load({limit})
            console.log(this.#collection.items)
        } catch (error) {
            console.error(error)
        }
    }

    search = async (searchValue: string) => {
        this.#collection.load({where: {name: searchValue, businessName: searchValue}})
    }

    onPaginatorChange = ({page, limit, next}) => {
        this.#collection.load({ limit, next });
    }

    hide = () => {
        this.#collection.off('change')
    }
}