import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import DaysContainer from '../Components/DaysContainer'
import DishesContainer from '../Components/DishesContainer'
import NavBar from '../Components/NavBar'

const User_P = observer(() => {
    const path = '/user'

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
})

export default User_P
