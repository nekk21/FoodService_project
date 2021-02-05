import React, { useContext, useEffect } from 'react'
import Dish from './Dish'
import image from '../images/wood.jpg'
import styled from 'styled-components'
import { Context } from '..'
import { getAllDishes } from '../http/dishesAPI'
import { observer } from 'mobx-react-lite'

const StyledDishContainer = styled.div`
    border: 1px solid black;
    width: 90%;
    margin: 0 auto;

    border-radius: 30px;
    background: url(${image});
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 30px;
    .menu {
        display: flex;
        width: 100%;
        justify-content: center;
        color: papayawhip;
        font-size: 5rem;
        font-family: cursive;
    }
`

const DishesContainer = observer(() => {
    const { dish } = useContext(Context)

    useEffect(() => {
        getAllDishes().then(data => {
            dish.setDishes(data)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <StyledDishContainer>
            <h1 className="menu">M_E_N_U</h1>
            {dish.dishes.map(dish => (
                <Dish
                    key={dish.id}
                    name={dish.name}
                    description={dish.description}
                    price={dish.price}
                    cookEmail={dish.cook.email}
                ></Dish>
            ))}
        </StyledDishContainer>
    )
})

export default DishesContainer
