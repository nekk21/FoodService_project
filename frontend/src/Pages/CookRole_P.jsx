import React, { useContext, useEffect } from 'react'
import Dish from '../Components/Dish'
import NavBar from '../Components/NavBar'
import image from '../images/wood.jpg'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { getMyDishes } from '../http/dishesAPI'

const StyledDishesContainer = styled.div`
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
const CookRole_P = observer(() => {
    const { dish } = useContext(Context)

    useEffect(() => {
        getMyDishes().then(data => {
            dish.setDishes(data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const page = '/cook'
    return (
        <>
            <NavBar page={page} />
            <StyledDishesContainer>
                {dish.dishes.map(dish => (
                    <Dish
                        key={dish.id}
                        name={dish.name}
                        description={dish.description}
                        price={dish.price}
                        cook={true}
                        cookEmail={dish.cook.email}
                    ></Dish>
                ))}
            </StyledDishesContainer>
        </>
    )
})

export default CookRole_P
