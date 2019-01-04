import * as React from "react";
import {connect} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {env} from "../../../../env";
import {renderFormField} from "../../../shared/RenderFormField";
import "./form-component.scss";

import axious from "axios";
import {required} from "../../../shared/Validations";


class JournalComponent extends React.Component<InjectedFormProps> {



    constructor(props: InjectedFormProps)
    {
        super(props);
    }

    public async submit(data: Models.IJournal)
    {
        const r = await axious.post(`${env.url}${env.endpoints.journals}`, data);
        if (r.status === 200)
        {
            this.props.reset();
        }
    }

    public render()
    {
        const {pristine, handleSubmit, invalid, reset} = this.props;

        return (
            <form action="" onSubmit={handleSubmit((e: Models.IJournal) => this.submit(e))} className="report-form">

                <div className="header">
                    <h2>Добавление Журнала</h2>
                    <br/>
                </div>

                <div className="form">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Название</label>
                                <Field
                                    component={renderFormField}
                                    name="name"
                                    type="text"
                                    required={true}
                                    placeholder="Например: Основы экономики"
                                    validate={[required]}
                                    className="form-control"/>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Ссылка на страницу в elibrary</label>
                                <Field
                                    component={renderFormField}
                                    name="url"
                                    type="text"
                                    required={true}
                                    placeholder="Например: https://elibrary.ru"
                                    validate={[required]}
                                    className="form-control"/>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="footer">
                    <div className="text-right pt-3 pb-3 bd-example">
                        <button type="button" onClick={reset} disabled={pristine}
                                className="btn btn-outline-primary mr-3">Сбросить
                        </button>
                        <button type="submit" disabled={invalid || pristine} className="btn btn-primary ">Добавить
                        </button>
                    </div>
                </div>
            </form>

        );

    }

}

const reduxF = reduxForm({
    form: 'reduxF'
})(JournalComponent);

export default connect()(reduxF);
