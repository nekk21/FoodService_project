import React, { useContext, useEffect, useState } from 'react'
import Dish from './Dish'
import styled from 'styled-components'
import { Context } from '..'
import { getAllDishes } from '../http/dishesAPI'
import { observer } from 'mobx-react-lite'
import ModalWindow from './ModalWindow'
import OrderCreateForm from './Forms/OrderCreateForm'

const StyledDishContainer = styled.div`
    border: 1px solid black;
    width: 90%;
    margin: 0 auto;

    border-radius: 30px;
    background: #424242;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 30px;
    padding: 0px 2rem;
    .menu {
        display: flex;
        width: 100%;
        justify-content: center;
        color: papayawhip;
        font-size: 5rem;
        font-family: cursive;
    }
`

const DishesContainer = observer(({ page }) => {
    const { dish } = useContext(Context)

    const [activeModal, setActiveModal] = useState(false)
    const child = <OrderCreateForm setActiveModal={setActiveModal} />

    useEffect(() => {
        getAllDishes().then(data => {
            dish.setDishes(data)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <StyledDishContainer>
            <ModalWindow
                active={activeModal}
                setActive={setActiveModal}
                children={child}
            />
            <h1 className="menu">M_E_N_U</h1>
            {dish.dishes.map(dish => (
                <Dish
                    key={dish.id}
                    id={dish.id}
                    name={dish.name}
                    description={dish.description}
                    price={dish.price}
                    cookEmail={dish.cook.email}
                    page={page}
                    setActiveModal={setActiveModal}
                ></Dish>
            ))}
        </StyledDishContainer>
    )
})

export default DishesContainer
