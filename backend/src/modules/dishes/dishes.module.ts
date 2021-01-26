import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import DishEntity from 'src/entities/dishes.entity'
import { AuthModule } from '../auth/auth.module'

import { DishesController } from './dishes.controller'
import { DishesService } from './dishes.service'

@Module({
    imports: [TypeOrmModule.forFeature([DishEntity]), AuthModule],
    controllers: [DishesController],
    providers: [DishesService],
})
export class DishesModule {}
