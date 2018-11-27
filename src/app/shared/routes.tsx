import * as React from "react";
import {Redirect, Route} from "react-router";

export function PrivateRoute({ component: Component, ...rest } : {component: any, path: string}) {
    return (
        <Route
            {...rest}
            render={props =>
                false ? (
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

