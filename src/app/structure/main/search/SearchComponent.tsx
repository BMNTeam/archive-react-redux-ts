import * as React from "react";
import {connect} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {search} from "../../../services/search/search.actions";
import {IAction} from "../../../shared/types";
import {IState} from "../../../store";
import CardComponent from "./CardComponent";
import ISearchRequest = Search.ISearchRequest;


class SearchComponent extends React.Component<InjectedFormProps & {
    report: Search.ISearchRequest[];
    search(data: Search.ISearchRequest): void;
}> {

    constructor(props: any)
    {
       super(props);
       this.submit = this.submit.bind(this);
    }

    public componentDidUpdate(): void
    {
        // TODO: get rid of it
        console.dir(this.props.report);
    }

    public submit(data: Search.ISearchRequest)
    {

        this.props.search(data);
    }

    public render()
    {
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
                </form>
                <br/>
                <h6>Результаты поиска</h6>
                <p className="small text-muted">Найдено 26 документов</p>
                {new Array(5).fill(1).map((e, i) => <CardComponent key={i}/>)}
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
