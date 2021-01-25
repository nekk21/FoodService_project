import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
//import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { SECRET } from '../../../config'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserEntity from '../../entities/users.entity'

@Module({
    imports: [
        //forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: SECRET,
            signOptions: { expiresIn: '2h' },
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
