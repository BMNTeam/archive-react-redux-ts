import * as React from "react";
import {connect} from "react-redux";
import {Route, withRouter} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import "../../../app/services/axious.defaultHeaders";
import {IAction} from "../../shared/types";
import {IState} from "../../store";
import {changeContainer} from "./actions/main.action";
import ArticleComponent from "./admin/components/ArticleComponent";
import EmployeesComponent from "./admin/components/EmployeesComponent";
import JournalComponent from "./admin/components/JournalComponent";
import ReferenceComponent from "./admin/components/ReferenceComponent";
import ReportComponent from "./admin/components/ReportComponent";
import "./main.component.scss";

import SearchComponent from "./search/SearchComponent";
import {SingleReportComponent} from "./single/SingleReportComponent";

class MainComponent extends React.Component<{noContainer: boolean, changeContainer(): void }, any> {
    public render()
    {
        let classes = 'bg-white full-screen-height';
        classes = this.props.noContainer ? `${classes} p-3` : `${classes} container`;
        return (
            <div className="content">
               <div className={classes}>
                   <div className="full-screen-button">
                       <button onClick={this.props.changeContainer} className="btn btn-link">
                          <i className="fa fa-navicon" />
                       </button>
                   </div>
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

function mapStateToProps(state: IState)
{
    return {noContainer: state.ui.noContainer}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, null, IAction<string>>) => ({
    changeContainer: () => dispatch(changeContainer()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent) as any)