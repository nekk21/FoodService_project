import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import DishStore from './Store/DishStore'
import OrderStore from './Store/OrderStore'
import UserStore from './Store/UserStore'

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            dish: new DishStore(),
            order: new OrderStore(),
        }}
    >
        <App />
    </Context.Provider>,
    document.getElementById('root')
)

reportWebVitals()
