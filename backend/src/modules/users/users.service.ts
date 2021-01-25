import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validate } from 'class-validator'
import RoleEntity from 'src/entities/roles.entity'
import { Repository, getRepository, DeleteResult } from 'typeorm'
import * as argon2 from 'argon2'
import UserEntity from '../../entities/users.entity'
import CreateUserDto from '../../modules/users/dto/create-User.dto'
import UpdateUserDto from '../../modules/users/dto/update-User.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
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

    async deleteByEmail(email: string): Promise<DeleteResult> {
        return await this.userRepository.delete({ email: email })
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete({ id: id })
    }

    async createUser(
        dto: CreateUserDto,
        role: RoleEntity
    ): Promise<UserEntity> {
        // check uniquene of email
        const { firstName, lastName, email, password } = dto
        const qb = await getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })

        const user = await qb.getOne()

        if (user) {
            const errors = { username: 'Username and email must be unique.' }
            throw new HttpException(
                { message: 'Input data validation failed', errors },
                HttpStatus.BAD_REQUEST
            )
        }

        // create new user
        const newUser = new UserEntity()
        newUser.firstName = firstName
        newUser.lastName = lastName
        newUser.email = email
        newUser.password = password
        if (role) newUser.role_id = role

        const errors = await validate(newUser)
        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid.' }
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
        const updatedUser: UpdateUserDto = updateData
        const currentUser = await this.userRepository.findOne(id)

        if (!currentUser) {
            const errors = { user: 'cannot find user :(' }
            throw new HttpException(
                { message: 'Cant find user with this field...(', errors },
                HttpStatus.BAD_REQUEST
            )
        }

        if (updatedUser.password) {
            currentUser.password = await argon2.hash(updatedUser.password)
        }
        if (updatedUser.firstName) {
            currentUser.firstName = updatedUser.firstName
        }
        if (updatedUser.lastName) {
            currentUser.lastName = updatedUser.lastName
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

    async addRole(id: number, role: RoleEntity): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id)
        user.role_id = role
        return this.userRepository.save(user)
    }

    async removeRole(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id)
        user.role_id = null
        return this.userRepository.save(user)
    }
}
