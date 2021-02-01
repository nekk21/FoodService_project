import React, { useEffect } from 'react'

import DaysContainer from '../Components/DaysContainer'
import DishesContainer from '../Components/DishesContainer'
import NavBar from '../Components/NavBar'

function Main_P(props) {
    const path = '/'

    useEffect(() => {
        document.title = `Food | Service`
    })

    return (
        <>
            <div>
                <NavBar page={path} />
                <DaysContainer />
                <DishesContainer />
            </div>
        </>
    )
}

export default Main_P
