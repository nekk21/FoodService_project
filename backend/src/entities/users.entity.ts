import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
    OneToMany,
    BeforeInsert,
    JoinColumn,
} from 'typeorm'

import { IsEmail } from 'class-validator'
import RoleEntity from './roles.entity'

import DishEntity from './dishes.entity'
import OrderEntity from './orders.entity'

import * as argon2 from 'argon2'

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

    @Column({ name: 'first_name', length: 100 })
    firstName: string

    @Column({ name: 'last_name', length: 100 })
    lastName: string

    @ManyToOne(() => RoleEntity, role => role.users, { eager: true })
    @JoinColumn({ name: 'role_id' })
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
