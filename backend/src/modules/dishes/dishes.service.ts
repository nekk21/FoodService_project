import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import DishEntity from 'src/entities/dishes.entity'
import DishDto from './dto/Dish.dto'
import UserEntity from 'src/entities/users.entity'
import { validate } from 'class-validator'

@Injectable()
export class DishesService {
    constructor(
        @InjectRepository(DishEntity)
        private readonly dishesRepository: Repository<DishEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getOne(id: string): Promise<DishEntity> {
        const dish = await this.dishesRepository.findOne(id)
        return dish
    }

    async getAll(): Promise<DishEntity[]> {
        try {
            const dishes = await this.dishesRepository.find()
            return dishes
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async getById(cook_id: number, id: number): Promise<DishEntity> {
        const dish = await this.dishesRepository.findOne({
            relations: ['cook'],
            where: {
                id: id,
                cook: { id: cook_id },
            },
        })

        if (!dish) {
            const errors = { Dish: 'Dish is not found' }
            throw new HttpException({ errors }, 402)
        }

        return dish
    }

    async getMyDishes(cook_id: number): Promise<DishEntity[]> {
        const dishes = await this.dishesRepository.find({
            relations: ['cook'],
            where: {
                cook: { id: cook_id },
            },
        })

        if (!dishes) {
            const errors = { dishes: 'Dish is not found' }
            throw new HttpException({ errors }, 402)
        }

        return dishes
    }

    async create(cook_id: number, createData: DishDto): Promise<DishEntity> {
        const cook = await this.userRepository.findOne(cook_id)

        const newDish = new DishEntity()

        newDish.cook = cook
        newDish.name = createData.name
        newDish.description = createData.description
        newDish.price = createData.price

        const errors = await validate(newDish)
        if (errors.length > 0) {
            const _errors = { name: 'Userinput is not valid.' }
            throw new HttpException(
                { message: 'Input data validation failed', _errors },
                HttpStatus.BAD_REQUEST
            )
        } else {
            const savedDish = await this.dishesRepository.save(newDish)
            return savedDish
        }
    }

    async update(
        cook_id: number,
        dish_id: number,
        updateData: DishDto
    ): Promise<DishEntity> {
        const currnetDish = await this.getById(cook_id, dish_id)

        if (!currnetDish) {
            const errors = { Dish: 'cannot find dish :(' }
            throw new HttpException(
                { message: 'Cant find dish with this field...(', errors },
                HttpStatus.BAD_REQUEST
            )
        }

        if (updateData.name) {
            currnetDish.name = updateData.name
        }
        if (updateData.description) {
            currnetDish.description = updateData.description
        }
        if (updateData.price) {
            currnetDish.price = updateData.price
        }

        return await this.dishesRepository.save(currnetDish)
    }

    async deleteById(cook_id: number, id: number): Promise<DishEntity> {
        const dish = await this.getById(cook_id, id)
        return await this.dishesRepository.remove(dish)
    }
}
