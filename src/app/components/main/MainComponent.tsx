import * as React from "react";
import {Route} from "react-router";
import AdminComponent from "./admin/AdminComponent";
import "./main.component.css";

import SearchComponent from "./search/SearchComponent";

class MainComponent extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="container bg-white content">
                <br/>
                <h5>Поиск</h5>
                    <Route path="/search" component={SearchComponent} />
                    <Route path="/admin" component={AdminComponent} />

            </div>
        )
    }
}

export default MainComponent;