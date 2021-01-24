import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm'

import UserEntity from './users.entity'
import Orders_Dishes from './orders_dishes.entity'

@Entity('orders')
export default class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    delivery_time: Date

    @ManyToOne(() => UserEntity, user => user.orders)
    customer_id: UserEntity

    @OneToMany(() => Orders_Dishes, orders_dishes => orders_dishes.order_id)
    orders_dishes: Orders_Dishes[]
}
