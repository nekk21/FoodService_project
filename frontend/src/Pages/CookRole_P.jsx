import React from 'react'
import Dish from '../Components/Dish'
import NavBar from '../Components/NavBar'

function CookRole_P(props) {
    const page = '/cook'
    return (
        <div>
            <NavBar page={page} />
            <Dish cook={true}></Dish>
        </div>
    )
}

export default CookRole_P
