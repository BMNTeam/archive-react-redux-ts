import * as React from 'react';
import {Provider} from "react-redux";

import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import AppComponent from "./app/AppComponent";
import LoginComponent from "./app/components/login/LoginComponent";
import {PrivateRoute} from "./app/shared/routes";
import store from "./app/store";


class App extends React.Component {
    public render()
    {
        return (
            <Provider store={store}>
                <div className="main-container">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/login" component={LoginComponent}/>
                            <PrivateRoute path="/" component={AppComponent}/>
                        </Switch>

                    </BrowserRouter>

                </div>
            </Provider>
        );
    }
}

export default App;
