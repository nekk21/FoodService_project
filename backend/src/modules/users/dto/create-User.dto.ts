import { IsNotEmpty } from 'class-validator'

export default class CreateUserDto {
    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly lastName: string

    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    readonly password: string
}
