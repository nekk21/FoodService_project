import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './modules/users/users.module'
import { DishesModule } from './modules/dishes/dishes.module'
import { OrdersModule } from './modules/orders/orders.module'
import config from '../ormconfig'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { RoleGuard } from './modules/auth/guards/role.guard'
import { AuthModule } from './modules/auth/auth.module'
import { Connection } from 'typeorm'

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
