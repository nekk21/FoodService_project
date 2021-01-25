import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import UserEntity from '../../entities/users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginUserDto } from '../users/dto/loginUser.dto'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async validateUser(userData: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne(userData)
        if (user) {
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
            role: userData.role_id.name,
        }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
