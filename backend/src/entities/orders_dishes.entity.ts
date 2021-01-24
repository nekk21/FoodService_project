import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import DishEntity from './dishes.entity'
import OrderEntity from './orders.entity'

@Entity('orders_dishes')
export default class Orders_Dishes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => DishEntity, dish => dish.orders_dishes)
    dish_id: DishEntity

    @ManyToOne(() => OrderEntity, order => order.orders_dishes)
    order_id: OrderEntity
}
