import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import CookRole_P from './Pages/CookRole_P'
import User_P from './Pages/User_P'
import Main_P from './Pages/Main_P'
import AdminRole_P from './Pages/AdminRole_P'
import { useContext } from 'react'
import { Context } from '.'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
    const { user } = useContext(Context)
    console.log(user.isAuth)

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route component={Main_P} path="/" exact />

                    {user.isAuth && (
                        <Route component={User_P} path="/user" exact />
                    )}
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
})

export default App
