import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '..'
import NavBar from '../Components/NavBar'

const Main_P = observer(() => {
    const path = '/'
    const { user } = useContext(Context)

    useEffect(() => {
        document.title = `Food | Service`
    })

    if (user.isAuth) {
        return <Redirect to="/user" />
    }

    return (
        <>
            <NavBar page={path} />
        </>
    )
})

export default Main_P
