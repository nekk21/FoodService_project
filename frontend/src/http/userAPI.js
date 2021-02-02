import { $host } from './axios'

export const logIn = async formData => {
    const response = await $host.post('/users/signin', formData)
    return response
}

export const register = async formData => {
    const response = await $host.post('/users/signup', formData)
    return response
}

// export const register = async formData => {
//     const response = await fetch(`http://localhost:4000/users/signup`, {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     const result = await response.json()
//     result.status = response.status

//     if (result.status < 300) {
//         logIn({
//             email: result.email,
//             password: formData.password,
//         })
//     } else if (result.status > 300) {
//         console.log(result.message)
//     }
//     return result
// }
