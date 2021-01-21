import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany,
} from 'typeorm'

import UserEntity from './users.entity'

@Entity('roles')
@Unique(['name'])
export default class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[]
}
