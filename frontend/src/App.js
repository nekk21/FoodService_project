import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import CookRole_P from './Pages/CookRole_P'
import User_P from './Pages/User_P'
import Main_P from './Pages/Main_P'
import AdminRole_P from './Pages/AdminRole_P'
import { Context } from '.'
import { getMydata } from './http/userAPI'

const App = observer(() => {
    const { user } = useContext(Context)

    const fetchMe = async () => {
        try {
            const response = await getMydata()
            user.setUser(response.data)
            user.setIsAuth(true)
        } catch (e) {
            localStorage.clear()
        }
    }

    useEffect(() => {
        fetchMe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
