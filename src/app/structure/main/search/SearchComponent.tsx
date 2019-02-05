import {ChangeEvent} from "react";
import * as React from "react";
import {connect} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {search} from "../../../services/search/search.actions";
import {TitleComponent} from "../../../shared/title/title.component";
import {IAction} from "../../../shared/types";
import {IState} from "../../../store";
import CardComponent from "./CardComponent";
import ISearchRequest = Search.ISearchRequest;
import ISearchDataType = Search.ISearchDataType;

interface ISearchProps {
    reports: Search.ISearchResult;
    search(data: Search.ISearchRequest): void;
}

interface ISearchState {
    isReport: boolean,
    isReference: boolean
}

class SearchComponent extends React.Component<InjectedFormProps & ISearchProps, ISearchState> {

    constructor(props: any)
    {
       super(props);
       this.state = {
           isReference: false,
           isReport: false
       };
       this.submit = this.submit.bind(this);
       this.setType = this.setType.bind(this);
    }

    public submit(data: Search.ISearchRequest)
    {
        data.type = this.getType();
        this.props.search(data);
    }

    public render()
    {
        const {reports} = this.props;
        return (
            <div>
                <TitleComponent text={'Поиск'} icon="fa-search"/>
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
                                    disabled={this.props.pristine || (!this.state.isReport && !this.state.isReference)}
                                    type="submit" id="button-addon2">
                                <i className="fa fa-search"/>Поиск</button>
                        </div>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" onChange={this.setType}  value="report"/>
                            <label className="form-check-label">Отчет</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" onChange={this.setType} value="reference"/>
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
                        text={r.text}
                        type={r.type}
                        />
                    )}
            </div>


        )
    }

    private setType(el: ChangeEvent<HTMLInputElement>)
    {
        const isReport = el.target.value === 'report';
        if(isReport)
        {
            this.setState({isReport: !this.state.isReport})
        } else {
            this.setState({isReference: !this.state.isReference})
        }
    }

    private getType(): ISearchDataType
    {
        if(this.state.isReference && this.state.isReport)
        {
            return "all"
        }
        return this.state.isReport ? "report" : "reference";
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
