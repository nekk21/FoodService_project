import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validate } from 'class-validator'
import { Repository, DeleteResult } from 'typeorm'
import * as argon2 from 'argon2'

import UserEntity from '../../entities/users.entity'
import RoleEntity from '../../entities/roles.entity'
import CreateUserDto from '../../modules/users/dto/create-User.dto'
import UpdateUserDto from '../../modules/users/dto/update-User.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) {}

    async getAll(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    async getById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id)

        if (!user) {
            const errors = { User: ' not found' }
            throw new HttpException({ errors }, 402)
        }

        return user
    }

    async getByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email: email },
        })
        if (!user) {
            const errors = { User: ' not found' }
            throw new HttpException({ errors }, 402)
        }

        return user
    }

    async deleteByEmail(email: string): Promise<UserEntity> {
        const user = await this.getByEmail(email)
        return await this.userRepository.remove(user)
    }

    async deleteById(id: number): Promise<UserEntity> {
        const user = await this.getById(id)
        return await this.userRepository.remove(user)
    }

    async create(
        createData: CreateUserDto,
        role: RoleEntity
    ): Promise<UserEntity> {
        // check uniquene of email
        let errors = await validate(createData)
        if (errors.length > 0) {
            const _errors = { message: 'All fields are required' }
            throw new HttpException(
                { message: 'Input data validation failed', _errors },
                HttpStatus.BAD_REQUEST
            )
        }

        // try {
        const user = await this.userRepository.findOne({
            where: { email: createData.email },
        })

        if (user) {
            const errors = { email: 'email must be unique.' }
            throw new HttpException(
                { message: 'Input data validation failed', errors },
                HttpStatus.BAD_REQUEST
            )
        }
        // } catch (err) {
        //     console.log(err)
        // }

        // create new user
        const newUser = new UserEntity()
        newUser.firstName = createData.firstName
        newUser.lastName = createData.lastName
        newUser.email = createData.email
        newUser.password = createData.password
        if (role) newUser.role = role

        errors = await validate(newUser)
        if (errors.length > 0) {
            const _errors = { username: 'User input is not valid.' }
            throw new HttpException(
                { message: 'Input data validation failed', _errors },
                HttpStatus.BAD_REQUEST
            )
        } else {
            const savedUser = await this.userRepository.save(newUser)
            return savedUser
        }
    }

    async update(id: number, updateData: UpdateUserDto): Promise<UserEntity> {
        const currentUser = await this.userRepository.findOne(id)

        if (!currentUser) {
            const errors = { user: 'cannot find user :(' }
            throw new HttpException(
                { message: 'Cant find user with this field...(', errors },
                HttpStatus.BAD_REQUEST
            )
        }

        if (updateData.password) {
            currentUser.password = await argon2.hash(updateData.password)
        }
        if (updateData.firstName) {
            currentUser.firstName = updateData.firstName
        }
        if (updateData.lastName) {
            currentUser.lastName = updateData.lastName
        }

        const errors = await validate(currentUser)
        if (errors.length > 0) {
            throw new HttpException(
                { message: 'Input data validation failed', errors },
                HttpStatus.BAD_REQUEST
            )
        }

        return await this.userRepository.save(currentUser)
    }

    async addRole(user_id: number, role_id: number): Promise<UserEntity> {
        const role = await this.roleRepository.findOne(role_id)
        const user = await this.userRepository.findOne(user_id)
        user.role = role
        return this.userRepository.save(user)
    }

    async becomeCook(user_id: number): Promise<UserEntity> {
        const role = await this.roleRepository.findOne(2)
        const user = await this.userRepository.findOne(user_id)
        user.role = role
        return this.userRepository.save(user)
    }

    async removeRole(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id)
        user.role = null
        return this.userRepository.save(user)
    }
}
