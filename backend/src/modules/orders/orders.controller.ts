import {
    Get,
    Post,
    Body,
    Put,
    Delete,
    Controller,
    Request,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import OrderEntity from '../../entities/orders.entity'

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get('')
    async getOrders(@Request() req): Promise<OrderEntity[]> {
        const orders = await this.ordersService.getAll(req.user.id)
        return orders
    }

    @Post('')
    async postOrder(@Request() req): Promise<OrderEntity> {
        ///test version
        return await this.ordersService.create(req.user.id, new Date())
    }

    @Put('')
    async addDish(
        @Request() req,
        @Body('orderId') orderId: number,
        @Body('dishId') dishId: number
    ): Promise<OrderEntity> {
        return await this.ordersService.update(req.user.id, orderId, dishId)
    }

    @Delete('')
    async deleteOrder(
        @Request() req,
        @Body('id') id: number
    ): Promise<OrderEntity> {
        return await this.ordersService.deleteById(req.user.id, id)
    }
}
