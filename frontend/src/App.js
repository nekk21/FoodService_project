import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main_P from './Pages/Main_P'

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route component={Main_P} path="/" exact />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App
