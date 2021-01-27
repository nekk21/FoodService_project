import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm'

import UserEntity from './users.entity'
import Orders_Dishes from './orders_dishes.entity'

@Entity('dishes')
export default class DishEntity {
    set cook_id(val) {
        this.cook = val
    }

    get cook_id() {
        return this.cook
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column({ length: 300 })
    description: string

    @Column()
    price: number

    @ManyToOne(() => UserEntity, user => user.dishes, { eager: true })
    cook: UserEntity

    @OneToMany(() => Orders_Dishes, orders_dishes => orders_dishes.dish)
    orders_dishes: Orders_Dishes[]
}
