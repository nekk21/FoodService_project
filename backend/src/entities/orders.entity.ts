import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
} from 'typeorm'

import UserEntity from './users.entity'
import DishEntity from './dishes.entity'

@Entity('orders')
export default class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    delivery_time: Date

    @ManyToOne(() => UserEntity, user => user.orders)
    customer_id: UserEntity

    @ManyToMany(() => DishEntity, dish => dish.orders)
    dishes: DishEntity[]
}
