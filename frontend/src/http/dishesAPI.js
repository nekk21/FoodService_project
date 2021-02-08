import { $authHost } from './axios'

export const getMyDishes = async () => {
    const { data } = await $authHost.get('/dishes/my')
    return data
}

export const getAllDishes = async () => {
    const { data } = await $authHost.get('/dishes')
    return data
}

export const postDish = async formData => {
    const { data } = await $authHost.post('/dishes', formData)
    return data
}

export const editDish = async formData => {
    const { data } = await $authHost.put('/dishes', formData)
    return data
}

export const deleteDish = async id => {
    const response = await $authHost.delete('/dishes', { data: { id: id } })
    return response
}
