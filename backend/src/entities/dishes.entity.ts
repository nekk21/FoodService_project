import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import UserEntity from './users.entity'

@Entity('orders')
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
}
