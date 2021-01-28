import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import DishEntity from 'src/entities/dishes.entity'
import OrderEntity from 'src/entities/orders.entity'
import OrdersDishes from 'src/entities/ordersDishes.entity'
import UserEntity from 'src/entities/users.entity'
import { AuthModule } from '../auth/auth.module'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            UserEntity,
            OrdersDishes,
            DishEntity,
        ]),
        AuthModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
