import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm'

import UserEntity from './users.entity'
import OrdersDishes from './ordersDishes.entity'

@Entity('orders')
export default class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'delivery_time', type: 'bigint' })
    deliveryTime: number

    @ManyToOne(() => UserEntity, users => users.orders, { eager: true })
    @JoinColumn({ name: 'customer_id' })
    customer: UserEntity

    @OneToMany(() => OrdersDishes, ordersDishes => ordersDishes.order, {
        eager: true,
    })
    ordersDishes: OrdersDishes[]
}
