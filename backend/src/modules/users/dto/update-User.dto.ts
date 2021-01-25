export default class CreateUserDto {
    readonly firstName: string

    readonly lastName: string

    readonly password: string

    readonly role_id: string

    readonly dishes: Array<string>

    readonly orders: Array<string>
}
