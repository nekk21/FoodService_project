export default class UserDto {
    constructor(payload) {
        this.id = payload.id
        this.email = payload.email
        this.role = payload.role
    }

    readonly id: number
    readonly email: string
    readonly role: string
}
