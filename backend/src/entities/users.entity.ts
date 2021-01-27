import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
    OneToMany,
    BeforeInsert,
} from 'typeorm'

import { IsEmail } from 'class-validator'
import RoleEntity from './roles.entity'

import DishEntity from './dishes.entity'
import OrderEntity from './orders.entity'

import * as argon2 from 'argon2'

@Entity('users')
@Unique(['email'])
export default class UserEntity {
    set role_id(val) {
        this.role = val
    }

    get role_id() {
        return this.role
    }

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

    @ManyToOne(() => RoleEntity, role => role.users, { eager: true })
    role: RoleEntity

    @OneToMany(() => DishEntity, dish => dish.cook)
    dishes: DishEntity[]

    @OneToMany(() => OrderEntity, order => order.customer)
    orders: OrderEntity[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password)
    }
}
