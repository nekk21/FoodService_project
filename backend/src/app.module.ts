import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './modules/users/users.module'
import { DishesModule } from './modules/dishes/dishes.module'
import { OrdersModule } from './modules/orders/orders.module'
import config from '../ormconfig'

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        UsersModule,
        DishesModule,
        OrdersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
