import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Home from './home'
import Pokemon from './Pokemon'
import Fiber from './fiber'
import Battle from './BattleScreen'



export default function Routing() {

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path="/home/">
                    <Home />
                </Route>
                <Route exact path="/pokemon/:id?">
                    <Pokemon />
                </Route>
                <Route exact path="/fiber">
                    <Fiber />
                </Route>
                <Route exact path='/battle'>
                    <Battle />
                </Route>
            </Switch>
        </>
    )
}