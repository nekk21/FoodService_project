import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import UserEntity from '../../entities/users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginUserDto } from '../users/dto/login-User.dto'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async validateUser(userData: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            email: userData.email,
        })
        if (!user) {
            return null
        }

        if (await argon2.verify(user.password, userData.password)) {
            return user
        }
        return null
    }

    async login(user: LoginUserDto) {
        const userData = await this.validateUser(user)
        if (!userData) return null
        const payload = {
            email: userData.email,
            id: userData.id,
            role: null,
        }
        if (userData.role) {
            payload.role = userData.role.name
        }
        return this.jwtService.sign(payload)
    }
}
