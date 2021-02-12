import { $authHost } from './axios'

export const postOrder = async data => {
    const responseOrder = await $authHost.post('/orders', { data: data.date })

    const responseDish = await $authHost.put('/orders', {
        orderId: responseOrder.data.id,
        dishId: data.dishId,
    })

    return { responseData: responseOrder.data, responseDish: responseDish }
}

export const getOrders = async () => {
    const { data } = await $authHost.get('/orders')
    return data
}

export const deleteOrder = async id => {
    const response = await $authHost.delete('/orders', { data: { id: id } })

    return response.data
}
