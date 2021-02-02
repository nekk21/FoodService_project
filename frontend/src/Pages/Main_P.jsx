import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'

function User_P(props) {
    const path = '/'

    useEffect(() => {
        document.title = `Food | Service`
    })

    return (
        <>
            <NavBar page={path} />
        </>
    )
}

export default User_P
