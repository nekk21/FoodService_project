import { makeAutoObservable } from 'mobx'

export default class DishStore {
    constructor() {
        this._dishes = []
        this._dish = {}
        makeAutoObservable(this)
    }

    setDishes(dishes) {
        this._dishes = dishes
    }

    get dishes() {
        return this._dishes
    }

    setDish(dish) {
        this._dish = dish
    }

    get dish() {
        return this._dish
    }
}
