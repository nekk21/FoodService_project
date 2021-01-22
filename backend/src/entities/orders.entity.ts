import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import UserEntity from './users.entity'

@Entity('dishes')
export default class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    delivery_time: Date

    @ManyToOne(() => UserEntity, user => user.orders)
    customer_id: UserEntity
}
