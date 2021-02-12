import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
////datepicker
import DatePicker from 'react-datepicker'
import { addDays, setHours, setMinutes } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
////other import
import M from 'materialize-css'
import styled from 'styled-components'
import { getOrders, postOrder } from '../../http/ordersAPI'
import { toJS } from 'mobx'
import { getTimestamp } from '../../CostomFunc/customFunctions'

const StyledDate = styled.div`
    .btn {
        z-index: 0;
        margin-top: 20px;
    }
`

const OrderCreateForm = observer(props => {
    const { dish } = useContext(Context)
    const { order } = useContext(Context)

    useEffect(() => {
        getOrders().then(orders => {
            order.setOrders(orders)
        })
    }, [order])

    const orders = toJS(order.orders)

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 0), 7)
    )

    const isWeekday = date => {
        const day = date.getDay()
        return day !== 0 && day !== 6
    }

    const orderPost = async inputDate => {
        try {
            const date = inputDate.toString()
            const response = await postOrder({
                date: date,
                dishId: dish.dish.id,
            })
            M.toast({ html: 'Order has been added!' })
            getOrders().then(orders => {
                order.setOrders(orders)
            })
            return response
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <StyledDate>
            <div>
                <strong> A good choice :)</strong>
                <p>
                    <strong> Name:</strong> {dish.dish.name}
                    <br /> <strong>Price:</strong> {dish.dish.price}$
                </p>
            </div>

            <DatePicker
                minDate={new Date()}
                selected={startDate}
                timeFormat="HH:mm"
                timeInputLabel="Time:"
                onChange={date => setStartDate(date)}
                filterDate={isWeekday}
                dateFormat="dd/MM/yyyy HH:mm"
                maxDate={addDays(new Date(), 7)}
                minTime={setHours(setMinutes(new Date(), 0), 7)}
                maxTime={setHours(setMinutes(new Date(), 30), 22)}
                showTimeSelect
            />

            <div className="buttons">
                <button
                    className="btn waves-effect waves-light #ffeb3b yellow black-text"
                    type="submit"
                    onClick={() => {
                        if (
                            orders.filter(
                                order =>
                                    getTimestamp(+order.deliveryTime)
                                        .dayOfWeek ===
                                    getTimestamp(+startDate).dayOfWeek
                            ).length < 1
                        ) {
                            orderPost(startDate)
                            props.setActiveModal(false)
                        } else {
                            M.toast({ html: 'U have an order on this Day!' })
                        }
                    }}
                >
                    Submit
                </button>
            </div>
        </StyledDate>
    )
})

export default OrderCreateForm
