import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import CookRole_P from './Pages/CookRole_P'
import Main_P from './Pages/Main_P'
import AdminRole_P from './Pages/AdminRole_P'
import { useContext } from 'react'
import { Context } from '.'

function App() {
    const { user } = useContext(Context)

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route component={Main_P} path="/" exact />
                    {user.isAuth && (
                        <Route component={CookRole_P} path="/cook" exact />
                    )}
                    {user.isAuth && (
                        <Route component={AdminRole_P} path="/admin" exact />
                    )}

                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App
