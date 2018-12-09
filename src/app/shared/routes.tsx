import * as React from "react";
import {Redirect, Route} from "react-router";
import {ACCESS_TOKEN} from "../services/auth/auth.constants";

const token = localStorage.getItem(ACCESS_TOKEN);
export function PrivateRoute({ component: Component, ...rest } : {component: any, path: string}) {
    return (
        <Route
            {...rest}
            render={props =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

