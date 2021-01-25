import { Controller, Get } from '@nestjs/common'
import { Public } from 'src/decorators/public.decorator'

@Controller('users')
export class UsersController {}
