import { $authHost, $host } from './axios'
import jwt from 'jwt-decode'

export const logIn = async formData => {
    const response = await $host.post('/users/signin', formData)
    localStorage.setItem('token', response.data.token)
    const decodeData = jwt(response.data.token)
    if (decodeData.role != null) {
        localStorage.setItem('role', decodeData.role)
    }
    return response
}

export const register = async formData => {
    const response = await $host.post('/users/signup', formData)
    return response
}

export const logOut = async () => {
    const response = await $authHost.get('/users/logout')
    return response
}

export const getMydata = async () => {
    const response = await $authHost.get('/users/me')

    return response
}
