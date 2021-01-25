import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult } from 'typeorm'
import { validate } from 'class-validator'

import OrderEntity from 'src/entities/orders.entity'
import UserEntity from '../../entities/users.entity'

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getAll(id: number): Promise<OrderEntity[]> {
        return await this.orderRepository.find({ where: { user: id } })
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return this.orderRepository.delete(id)
    }

    async getById(customer_id: number, order_id: number): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({
            relations: ['users'],
            where: {
                id: order_id,
                customer: { id: customer_id },
            },
        })

        if (!order) {
            const errors = { Company: 'Order is not found' }
            throw new HttpException({ errors }, 402)
        }

        return order
    }

    async create(id: number, createDtata: OrderEntity): Promise<OrderEntity> {
        const order: OrderEntity = createDtata
        const customer = await this.userRepository.findOne(id)
        if (!customer) {
            const errors = { customer: 'Customer not found' }
            throw new HttpException({ errors }, 402)
        }

        order.customer_id = customer

        const errors = await validate(order)
        if (errors.length > 0) {
            throw new HttpException(
                { message: 'Input data validation failed', errors },
                HttpStatus.BAD_REQUEST
            )
        }
        try {
            return this.orderRepository.save(order)
        } catch (error) {
            throw new HttpException(
                { message: 'Query Error', error },
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
