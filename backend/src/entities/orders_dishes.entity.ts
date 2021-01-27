import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import DishEntity from './dishes.entity'
import OrderEntity from './orders.entity'

@Entity('orders_dishes')
export default class Orders_Dishes {
    set order_id(val) {
        this.order = val
    }

    get order_id() {
        return this.order
    }

    set dish_id(val) {
        this.dish = val
    }

    get dish_id() {
        return this.dish
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => DishEntity, dish => dish.orders_dishes, { eager: true })
    dish: DishEntity

    @ManyToOne(() => OrderEntity, order => order.orders_dishes)
    order: OrderEntity
}
