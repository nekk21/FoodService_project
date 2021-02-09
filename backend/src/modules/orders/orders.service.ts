import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { validate } from 'class-validator'

import OrderEntity from 'src/entities/orders.entity'
import UserEntity from '../../entities/users.entity'
import DishEntity from '../../entities/dishes.entity'
import OrdersDishesEntity from '../../entities/ordersDishes.entity'

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(OrdersDishesEntity)
        private readonly ordersDishesRepository: Repository<OrdersDishesEntity>,

        @InjectRepository(DishEntity)
        private readonly dishesRepository: Repository<DishEntity>
    ) {}

    async getAll(customer_id: number): Promise<OrderEntity[]> {
        return await this.orderRepository.find({
            where: { customer: customer_id },
        })
    }

    async deleteById(customer_id: number, id: number): Promise<OrderEntity> {
        const order = await this.getById(customer_id, id)

        const orders_dishes = await this.ordersDishesRepository.find({
            where: {
                order: order,
            },
        })

        await this.ordersDishesRepository.remove(orders_dishes)

        return await this.orderRepository.remove(order)
    }

    async getById(customer_id: number, id: number): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({
            relations: ['customer'],
            where: {
                id: id,
                customer: { id: customer_id },
            },
        })

        if (!order) {
            const errors = { Order: 'Order is not found' }
            throw new HttpException({ errors }, 402)
        }

        return order
    }

    async create(
        customer_id: number,
        delivery_time: any
    ): Promise<OrderEntity> {
        const customer = await this.userRepository.findOne(customer_id)

        const data = Date.parse(delivery_time.data)
        //Thu, 09 Feb 2021 12:30:00  // data format // or 09 Feb 2021 12:30:00

        const newOrder = new OrderEntity()

        newOrder.deliveryTime = data

        newOrder.customer = customer

        const errors = await validate(newOrder)
        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid.' }
            throw new HttpException(
                { message: 'Input data validation failed', _errors },
                HttpStatus.BAD_REQUEST
            )
        } else {
            const savedOrder = await this.orderRepository.save(newOrder)
            return savedOrder
        }
    }

    async update(
        customer_id: number,
        order_id: number,
        dish_id: number
    ): Promise<OrderEntity> {
        const order = await this.getById(customer_id, order_id)
        const dish = await this.dishesRepository.findOne(dish_id)

        const newOrdersDishes = new OrdersDishesEntity()
        newOrdersDishes.order = order
        newOrdersDishes.dish = dish

        await this.ordersDishesRepository.save(newOrdersDishes)

        const savedOrder = await this.getById(customer_id, order_id)

        return savedOrder
    }
}
