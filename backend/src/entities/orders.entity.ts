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
    set customer_id(val) {
        this.customer = val
    }

    get customer_id() {
        return this.customer
    }

    set delivery_time(val) {
        this.deliveryTime = val
    }

    get delivery_time() {
        return this.deliveryTime
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    deliveryTime: Date

    @ManyToOne(() => UserEntity, users => users.orders, { eager: true })
    customer: UserEntity

    @OneToMany(() => Orders_Dishes, orders_dishes => orders_dishes.order, {
        eager: true,
    })
    orders_dishes: Orders_Dishes[]
}
