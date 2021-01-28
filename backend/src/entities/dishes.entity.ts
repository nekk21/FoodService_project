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

@Entity('dishes')
export default class DishEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column({ length: 300 })
    description: string

    @Column()
    price: number

    @ManyToOne(() => UserEntity, user => user.dishes, { eager: true })
    @JoinColumn({ name: 'cook_id' })
    cook: UserEntity

    @OneToMany(() => OrdersDishes, ordersDishes => ordersDishes.dish)
    ordersDishes: OrdersDishes[]
}
