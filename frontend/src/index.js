import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import DishStore from './Store/DishStore'
import UserStore from './Store/UserStore'

export const Context = createContext(null)

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                dish: new DishStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
