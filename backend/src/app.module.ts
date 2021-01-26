import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { Connection } from 'typeorm'

import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { RoleGuard } from './modules/auth/guards/role.guard'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { DishesModule } from './modules/dishes/dishes.module'
import { OrdersModule } from './modules/orders/orders.module'
import config from '../ormconfig'

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        AuthModule,
        UsersModule,
        DishesModule,
        OrdersModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
