import * as React from "react";
import {connect} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {search} from "../../../services/search/search.actions";
import {IAction} from "../../../shared/types";
import {IState} from "../../../store";
import CardComponent from "./CardComponent";
import ISearchRequest = Search.ISearchRequest;

interface ISearchProps {
    reports: Search.ISearchResult;
    search(data: Search.ISearchRequest): void;
}

class SearchComponent extends React.Component<InjectedFormProps & ISearchProps> {

    constructor(props: any)
    {
       super(props);
       this.submit = this.submit.bind(this);
    }

    public submit(data: Search.ISearchRequest)
    {

        this.props.search(data);
    }

    public render()
    {
        const {reports} = this.props;
        return (
            <div>
                <h3>Поиск</h3>
                <form onSubmit={this.props.handleSubmit(this.submit)}>
                    <div className="input-group mb-3 mt-3">
                        <br/>
                        <Field className="form-control"
                               type="text" name="search"
                               component="input"
                               placeholder="Например: отчет об урожайности"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary"
                                    disabled={this.props.pristine}
                                    type="submit" id="button-addon2">
                                <i className="fa fa-search"/>Поиск</button>
                        </div>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" defaultChecked={true} value="option1"/>
                            <label className="form-check-label">Отчет</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" value="option2"/>
                            <label className="form-check-label" >Справка</label>
                    </div>
                </form>
                <br/>
                {reports.data && <div>
                  <h6>Результаты поиска</h6>
                  <p className="small text-muted">Найдено {reports.data.length} документа</p>
                </div>}
                { reports.data && reports.data
                    .map(r => <CardComponent
                        key={r.id}
                        authors={r.authors}
                        id={r.id}
                        name={r.name}
                        shortText={r.short_report_text}
                        type={r.type}
                        />
                    )}
            </div>


        )
    }
}

function mapStateToProps(state: IState)
{
    return {
        reports: state.reports
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, null, IAction<string>>) => ({
    search: (data: ISearchRequest) => dispatch(search(data)),
});

const reduxFormSignIn =  reduxForm({
    form: 'login'
})(SearchComponent);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSignIn)
