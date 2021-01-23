import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm'

import UserEntity from './users.entity'
import OrderEntity from './orders.entity'

@Entity('dishes')
export default class DishEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column({ length: 100 })
    description: string

    @Column()
    price: number

    @ManyToOne(() => UserEntity, user => user.dishes)
    user_id: UserEntity

    @ManyToMany(() => OrderEntity, order => order.dishes)
    @JoinTable()
    orders: OrderEntity[]
}
