import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Post,
    Put,
    Request,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'

import RoleEntity from 'src/entities/roles.entity'
import UpdateUserDto from './dto/update-User.dto'
import { Public } from 'src/decorators/public.decorator'
import { Roles } from 'src/decorators/role.decorator'
import { LoginUserDto } from './dto/login-User.dto'
import UserEntity from 'src/entities/users.entity'

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private authService: AuthService
    ) {}

    @Public()
    @Post('signup')
    async signup(
        @Body('email') email: string,
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('password') password: string,
        @Body('role_id') role: RoleEntity
    ) {
        return this.userService.create(
            {
                email,
                firstName,
                lastName,
                password,
            },
            role
        )
    }

    @Public()
    @Post('signin')
    async login(@Body('') loginUserDto: LoginUserDto): Promise<any> {
        const _user = await this.userService.getByEmail(loginUserDto.email)

        const errors = { User: ' not found' }
        if (!_user) throw new HttpException({ errors }, 402)

        const token = await (await this.authService.login(loginUserDto))
            .access_token
        const { id, email } = _user
        const user = {
            id,
            email,
            token,
        }
        return user
    }

    @Get('logout')
    async logout(@Request() req) {
        req.logout()
        return 'Logged out'
    }

    @Roles('ADMIN')
    @Get('profile')
    async findProfileById(@Request() req): Promise<UserEntity> {
        return await this.userService.getById(req.user.id)
    }

    @Get('profile/:id')
    async findMe(@Param() params): Promise<UserEntity> {
        return await this.userService.getById(params.id)
    }

    @Put('profile')
    async profileUpdateById(@Request() req, @Body() userData: UpdateUserDto) {
        return await this.userService.update(req.user.id, userData)
    }

    @Delete('profile')
    async delete(@Request() req) {
        const deleteResult = await this.userService.deleteById(req.user.id)
        req.logout()
        return deleteResult
    }

    @Post('profile/role')
    async profileAddRole(@Request() req, @Body('role') role: number) {
        return await this.userService.addRole(req.user.id, role)
    }

    @Delete('profile/role')
    async profileRemoveRole(@Request() req) {
        return await this.userService.removeRole(req.user.id)
    }
}
