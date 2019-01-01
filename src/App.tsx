import * as React from 'react';
import {Provider} from "react-redux";

import {Route, Router, Switch} from "react-router";
import './App.scss';
import AppComponent from "./app/AppComponent";
import LoginComponent from "./app/structure/login/LoginComponent";

import "./app/services/axious.defaultHeaders";
import history from './app/shared/history';
import {PrivateRoute} from "./app/shared/routes";
import store from "./app/store";


class App extends React.Component {
    public render()
    {
        return (
            <Provider store={store}>
                <div className="main-container">
                    <Router history={history}>
                        <Switch>
                            <Route  path="/login" component={LoginComponent}/>
                            <PrivateRoute path="/" component={AppComponent}/>
                        </Switch>

                    </Router>

                </div>
            </Provider>
        );
    }
}

export default App;
