import { makeAutoObservable } from 'mobx'

export default class DishStore {
    constructor() {
        this._dish = {}
        makeAutoObservable(this)
    }

    setUser(dish) {
        this._dish = dish
    }

    get dish() {
        return this._dish
    }
}
