import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
} from '@nestjs/common'
import { Roles } from 'src/decorators/role.decorator'
import DishEntity from 'src/entities/dishes.entity'
import { DishesService } from './dishes.service'
import DishDto from './dto/Dish.dto'

@Controller('dishes')
export class DishesController {
    constructor(private readonly DishService: DishesService) {}

    @Roles('COOK')
    @Post()
    async create(
        @Request() req,
        @Body() createData: DishDto
    ): Promise<DishEntity> {
        return this.DishService.create(req.user.id, createData)
    }

    @Roles('COOK')
    @Put()
    async update(
        @Request() req,
        @Body('dish_id') dish_id: number,
        @Body() updateData: DishDto
    ): Promise<DishEntity> {
        return this.DishService.update(req.user.id, dish_id, updateData)
    }

    @Roles('COOK')
    @Get('/my')
    async getMyDishes(@Request() req): Promise<DishEntity[]> {
        const dishes = await this.DishService.getMyDishes(req.user.id)
        return dishes
    }

    @Get()
    async getDishes(): Promise<DishEntity[]> {
        const dishes = await this.DishService.getAll()
        return dishes
    }

    @Get('/:id')
    async getOne(@Param() param): Promise<DishEntity> {
        const dish = await this.DishService.getOne(param.id)
        return dish
    }

    @Roles('COOK', 'ADMIN')
    @Delete()
    async deleteDish(
        @Request() req,
        @Body('id') id: number
    ): Promise<DishEntity> {
        return await this.DishService.deleteById(req.user.id, id)
    }
}
