import React, { useContext, useEffect, useState } from 'react'
import M from 'materialize-css'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { Context } from '..'
import { getMyDishes, postDish, editDish, deleteDish } from '../http/dishesAPI'
import Dish from '../Components/Dish'
import NavBar from '../Components/NavBar'
import DishCreateForm from '../Components/Forms/DishCreateForm'
import ModalWindow from '../Components/ModalWindow'
import DishEditForm from '../Components/Forms/DishEditForm'

const StyledDishesContainer = styled.div`
    border: 1px solid black;
    width: 90%;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 30px;
    background: #424242;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 30px;

    .buttonLine {
        display: flex;
        position: relative;
        height: 60px;
        width: 100%;
        flex-direction: row-reverse;
        padding: 15px;
    }
    .wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
    }
`
const CookRole_P = observer(() => {
    ////local state
    const [activatorEdit, setActivatorEdit] = useState(false)
    const [activator, setActivator] = useState(false)
    ////dish state
    const { dish } = useContext(Context)

    useEffect(() => {
        getMyDishes().then(data => {
            dish.setDishes(data)
        })
    }, [dish])

    //////////////////////////edit dish
    const editSubmit = async values => {
        try {
            const response = await editDish({
                ...values,
                dish_id: dish.dish.id,
            })
            /////rerender
            const dishes = await getMyDishes()
            dish.setDishes(dishes)

            setActivatorEdit(false)
            return response
        } catch (e) {
            console.log(e)
        }
    }

    /////////////////////////delete dish
    const deleteSubmit = async () => {
        try {
            const confirm = window.confirm(
                `Are u sure? You want to delete dish - ${dish.dish.name}?`
            )
            if (confirm) {
                const response = await deleteDish(dish.dish.id)
                ////rerender
                const dishes = await getMyDishes()
                dish.setDishes(dishes)
                return response
            }
        } catch (e) {
            M.toast({ html: 'Active order contain this dish!!!' })
        }
    }

    /////////////////////////create dish
    const createSubmit = async values => {
        try {
            const response = await postDish(values)
            //rerender
            const dishes = await getMyDishes()
            dish.setDishes(dishes)
            setActivator(false)
            return response
        } catch (e) {
            console.log(e)
        }
    }

    const addDishContent = <DishCreateForm submit={createSubmit} />
    const editDishContent = (
        <DishEditForm submit={editSubmit} targetData={dish.dish} />
    )

    const page = '/cook'
    return (
        <>
            <ModalWindow
                active={activator}
                setActive={setActivator}
                children={addDishContent}
            />
            <ModalWindow
                active={activatorEdit}
                setActive={setActivatorEdit}
                children={editDishContent}
            />

            <NavBar page={page} />
            <div className="wrapper">
                <StyledDishesContainer>
                    <div className="buttonLine">
                        <button
                            className="btn waves-effect waves-light #ffeb3b yellow black-text"
                            onClick={() => {
                                setActivator(true)
                            }}
                        >
                            <i className="material-icons right">add</i>
                            Add Dish
                        </button>
                    </div>

                    {dish.dishes.map(dish => (
                        <Dish
                            key={dish.id}
                            id={dish.id}
                            name={dish.name}
                            description={dish.description}
                            price={dish.price}
                            cook={true}
                            cookEmail={dish.cook.email}
                            activatorEdit={activatorEdit}
                            setActivatorEdit={setActivatorEdit}
                            deleteFunction={deleteSubmit}
                        ></Dish>
                    ))}
                </StyledDishesContainer>
            </div>
        </>
    )
})

export default CookRole_P
