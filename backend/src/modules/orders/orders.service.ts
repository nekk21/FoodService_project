import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { validate } from 'class-validator'

import OrderEntity from 'src/entities/orders.entity'
import UserEntity from '../../entities/users.entity'
import DishEntity from '../../entities/dishes.entity'
import OrdersDishesEntity from '../../entities/orders_dishes.entity'

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

    async getAll(id: number): Promise<OrderEntity[]> {
        return await this.orderRepository.find({ where: { customer_id: id } })
    }

    async deleteById(customer_id: number, id: number): Promise<OrderEntity> {
        const order = await this.getById(id, customer_id)
        return await this.orderRepository.remove(order)
    }

    async getById(customer_id: number, id: number): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({
            relations: ['users'],
            where: {
                id: id,
                users: { id: customer_id },
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
        delivery_time: Date
    ): Promise<OrderEntity> {
        const customer = await this.userRepository.findOne(customer_id)

        const newOrder = new OrderEntity()
        newOrder.customer_id = customer
        newOrder.delivery_time = delivery_time

        const errors = await validate(newOrder)
        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid.' }
            throw new HttpException(
                { message: 'Input data validation failed', _errors },
                HttpStatus.BAD_REQUEST
            )
        } else {
            const savedOrder = await this.userRepository.save(newOrder)
            return savedOrder
        }
    }

    async update(
        customer_id: number,
        order_id: number,
        dish_id: number
    ): Promise<OrderEntity> {
        const order = await this.getById(order_id, customer_id)
        const dish = await this.dishesRepository.findOne(dish_id)

        const newOrdersDishes = new OrdersDishesEntity()
        newOrdersDishes.order_id = order
        newOrdersDishes.dish_id = dish

        await this.ordersDishesRepository.save(newOrdersDishes)

        const savedOrder = await this.getById(order_id, customer_id)

        return savedOrder
    }
}
