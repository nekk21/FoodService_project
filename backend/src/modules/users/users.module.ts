import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import UserEntity from 'src/entities/users.entity'
import RoleEntity from 'src/entities/roles.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
