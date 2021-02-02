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
import CreateUserDto from './dto/create-User.dto'

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private authService: AuthService
    ) {}

    @Public()
    @Post('signup')
    async signup(@Body() data: CreateUserDto, @Body('role') role: RoleEntity) {
        const user = await this.userService.create(data, role)
        // const loginedUser = await this.login({
        //     email: data.email,
        //     password: data.password,
        // })

        return user
    }

    @Public()
    @Post('signin')
    async login(@Body('') loginUserDto: LoginUserDto): Promise<any> {
        const _user = await this.userService.getByEmail(loginUserDto.email)

        const errors = { User: ' not found' }
        if (!_user) throw new HttpException({ errors }, 402)

        const token = await await this.authService.login(loginUserDto)
        if (!token) {
            throw new HttpException({ message: 'Wrong password' }, 402)
        }
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
    @Get('')
    async getAll() {
        return await this.userService.getAll()
    }

    @Roles('ADMIN')
    @Post('profile')
    async findProfileById(@Body() id: number): Promise<UserEntity> {
        return await this.userService.getById(id)
    }

    @Get('/me')
    async GetMe(@Request() req): Promise<UserEntity> {
        return await this.userService.getById(req.user.id)
    }

    @Get('/:id/profile')
    async findMe(@Param() params): Promise<UserEntity> {
        return await this.userService.getById(params.id)
    }

    @Put('profile')
    async profileUpdateById(@Request() req, @Body() userData: UpdateUserDto) {
        return await this.userService.update(req.user.id, userData)
    }

    @Delete('/me')
    async delete(@Request() req) {
        const deleteResult = await this.userService.deleteById(req.user.id)
        req.logout()
        return deleteResult
    }

    @Roles('ADMIN')
    @Delete('/this')
    async adminDelete(@Body() id: number) {
        const deleteResult = await this.userService.adminDeleteById(id)
        return deleteResult
    }

    @Post('cook')
    async profileAddRole(@Request() req) {
        await this.userService.becomeCook(req.user.id)
        req.logout()
        return { message: 'Role change success. Please relog' }
    }

    @Post('uncook')
    async profileRemoveRole(@Request() req) {
        await this.userService.removeRole(req.user.id)
        req.logout()
        return { message: 'Role change success. Please relog' }
    }
}
