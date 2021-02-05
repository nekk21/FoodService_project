import { $authHost } from './axios'

export const getMyDishes = async () => {
    const { data } = await $authHost.get('/dishes/my')
    return data
}

export const getAllDishes = async () => {
    const { data } = await $authHost.get('/dishes')
    return data
}
