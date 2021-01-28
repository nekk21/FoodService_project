import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import DishEntity from './dishes.entity'
import OrderEntity from './orders.entity'

@Entity('orders_dishes')
export default class OrdersDishes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => DishEntity, dish => dish.ordersDishes, { eager: true })
    @JoinColumn({ name: 'dish_id' })
    dish: DishEntity

    @ManyToOne(() => OrderEntity, order => order.ordersDishes)
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity
}
