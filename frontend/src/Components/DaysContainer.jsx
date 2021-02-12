import React, { useContext, useEffect } from 'react'
import Day from './Day'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { deleteOrder, getOrders } from '../http/ordersAPI'
import { Context } from '..'
import { toJS } from 'mobx'

const StyledDayContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 2rem;
    justify-content: center;
`

const DaysContainer = observer(() => {
    const { order } = useContext(Context)
    const now = Date.now()

    useEffect(() => {
        getOrders().then(orders => {
            order.setOrders(orders)
        })
    }, [order])

    const orders = toJS(order.orders)

    const orderToDelete = orders.filter(order => order.deliveryTime < now)

    if (orderToDelete) {
        orderToDelete.forEach(element => {
            deleteOrder(element.id)
        })
    }

    return (
        <StyledDayContainer>
            <Day day={'Mon'} />
            <Day day={'Tue'} />
            <Day day={'Wed'} />
            <Day day={'Thu'} />
            <Day day={'Fri'} />
        </StyledDayContainer>
    )
})

export default DaysContainer
