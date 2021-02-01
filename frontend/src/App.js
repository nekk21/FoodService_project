import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import CookRole_P from './Pages/CookRole_P'
import Main_P from './Pages/Main_P'

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route component={Main_P} path="/" exact />
                    <Route component={CookRole_P} path="/cook_role" />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App
