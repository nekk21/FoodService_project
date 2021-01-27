import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import DishEntity from 'src/entities/dishes.entity'
import UserEntity from 'src/entities/users.entity'
import { AuthModule } from '../auth/auth.module'
import { DishesController } from './dishes.controller'
import { DishesService } from './dishes.service'

@Module({
    imports: [TypeOrmModule.forFeature([DishEntity, UserEntity]), AuthModule],
    controllers: [DishesController],
    providers: [DishesService],
})
export class DishesModule {}
