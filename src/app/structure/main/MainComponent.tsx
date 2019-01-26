import * as React from "react";
import {Route} from "react-router";
import ArticleComponent from "./admin/components/ArticleComponent";
import EmployeesComponent from "./admin/components/EmployeesComponent";
import JournalComponent from "./admin/components/JournalComponent";
import ReferenceComponent from "./admin/components/ReferenceComponent";
import ReportComponent from "./admin/components/ReportComponent";
import "./main.component.scss";

import SearchComponent from "./search/SearchComponent";
import {SingleReportComponent} from "./single/SingleReportComponent";

class MainComponent extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="content">
               <div className="container bg-white full-screen-height">
                   <Route path="/search" component={SearchComponent} />
                   <Route path="/admin" component={ReportComponent} />
                   <Route path="/reference" component={ReferenceComponent} />
                   <Route path="/employees" component={EmployeesComponent} />
                   <Route path="/article" component={ArticleComponent} />
                   <Route path="/journal" component={JournalComponent} />
                   <Route path="/single/:type/:id" component={SingleReportComponent} />
               </div>
            </div>
        )
    }
}

export default MainComponent;