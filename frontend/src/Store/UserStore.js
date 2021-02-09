import { makeAutoObservable } from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._users = []
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    get isAuth() {
        return this._isAuth
    }

    setUsers(users) {
        this._users = users
    }
    get users() {
        return this._users
    }

    setUser(user) {
        this._user = user
    }
    get user() {
        return this._user
    }
}
