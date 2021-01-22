import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
    OneToMany,
} from 'typeorm'

import { IsEmail } from 'class-validator'
import RoleEntity from './roles.entity'

import DishEntity from './dishes.entity'
import OrderEntity from './orders.entity'

@Entity('users')
@Unique(['email'])
export default class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsEmail()
    email: string

    @Column()
    password: string

    @Column({ default: '', length: 100 })
    firstName: string

    @Column({ default: '', length: 100 })
    lastName: string

    @Column({ default: '' })
    image: string

    @ManyToOne(() => RoleEntity, role => role.users)
    role: RoleEntity

    @OneToMany(() => DishEntity, dish => dish.user_id)
    dishes: DishEntity[]

    @OneToMany(() => OrderEntity, order => order.customer_id)
    orders: OrderEntity[]
}
