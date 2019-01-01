import * as React from "react";
import {Route} from "react-router";
import AdminComponent from "./admin/AdminComponent";
import "./main.component.scss";

import SearchComponent from "./search/SearchComponent";

class MainComponent extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="content">
               <div className="container bg-white full-screen-height">
                   <Route path="/search" component={SearchComponent} />
                   <Route path="/admin" component={AdminComponent} />
               </div>
            </div>
        )
    }
}

export default MainComponent;