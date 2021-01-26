import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { ROLE } from '../../../decorators/role.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const role = this.reflector.get<string[]>(ROLE, context.getHandler())
        const request = context.switchToHttp().getRequest()
        const user = request.user
        if (!role) {
            return true
        }
        if (!user.role) {
            return false
        }
        return this.matchRole(role, user.role)
    }

    matchRole(str1: string[], str2: string) {
        for (let i = 0; i < str1.length; i++)
            if (!str1[i].localeCompare(str2)) {
                return true
            }
        return false
    }
}
