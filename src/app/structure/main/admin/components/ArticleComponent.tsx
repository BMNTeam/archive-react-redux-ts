import * as React from "react";
import {connect} from "react-redux";
import Select from "react-select";
import {OptionsType, } from "react-select/lib/types";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {env} from "../../../../env";
import {CategoryImageComponent} from "../../../../shared/category-image/category-image.component";
import {TitleComponent} from "../../../../shared/title/title.component";
import FileInput from "../../../shared/FileInput";
import {renderFormField} from "../../../shared/RenderFormField";
import "./form-component.scss";

import axious from "axios";
import {required} from "../../../shared/Validations";
import {AdminService} from "../admin-service";
import {getAsFormData} from "../admin-shared";



class ArticleComponent extends React.Component<InjectedFormProps, {
    employees: OptionsType<number>;
    journals: OptionsType<number>;
}> {

    private adminService = new AdminService();

    constructor(props: InjectedFormProps)
    {
        super(props);
        this.state = {
            employees: [],
            journals: []
        }

    }

    public async componentWillMount()
    {
        const employeesOptions = await this.adminService.getEmployeesOptions();
        const journalsOptions = await this.adminService.getJournalsOptions();

        this.setState(Object.assign(this.state, {
            employees: employeesOptions,
            journals: journalsOptions
        }));
    }


    public async submit(data: Models.Client.IArticle)
    {
        const formData = getAsFormData<Models.Client.IArticle>(data);
        const r = await axious.post(`${env.url}${env.endpoints.articles}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data;'}
        });
        if (r.status === 200)
        {
            this.props.reset();
        }
    }



    public render()
    {
        const {pristine, handleSubmit, invalid, reset} = this.props;

        return (
            <form action="" onSubmit={handleSubmit((e: Models.Client.IArticle) => this.submit(e))} className="report-form">

                <div className="form">
                    <TitleComponent text="Добавление статьи" icon="fa-wpforms "/>
                    <h5>Основная информация</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <CategoryImageComponent icon="fa-wpforms"/>
                        </div>
                        <div className="col-md-8">
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
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Авторы</label>
                                <Field component={props =>
                                    <Select
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        options={this.state.employees}
                                        isMulti={true}
                                        placeholder="Выбрать"
                                    />}
                                       name="authors"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Журнал</label>
                                <Field component={props =>
                                    <Select
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        options={this.state.journals}
                                        placeholder="Выбрать"
                                    />}
                                       name="journal"
                                />
                            </div>

                        </div>
                    </div>
                    <h5>Файлы</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Статья</label>
                                <div className="custom-file">
                                    <Field
                                        component={FileInput}
                                        placeholder="Полный текст статьи"
                                        validate={[required]}
                                        name="fullText"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <div className="text-right pt-3 pb-3 bd-example">
                        <button type="button" onClick={reset} disabled={pristine}
                                className="btn btn-outline-primary mr-3">Сбросить
                        </button>
                        <button type="submit" disabled={invalid || pristine} className="btn btn-primary ">Отправить
                        </button>
                    </div>
                </div>
            </form>

        );

    }

}

const reduxFormAddReport = reduxForm({
    form: 'reduxF'
})(ArticleComponent);

export default connect()(reduxFormAddReport);
