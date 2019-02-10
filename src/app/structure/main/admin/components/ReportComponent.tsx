import * as React from "react";
import {connect} from "react-redux";
import Select from "react-select";
import {OptionsType} from "react-select/lib/types";
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

interface IOpitons {
    articles: OptionsType<number>,
    employees: OptionsType<number>
}

class ReportComponent extends React.Component<InjectedFormProps, IOpitons> {
    constructor(props: InjectedFormProps)
    {
        super(props);
        this.state = {
            articles: [],
            employees: []
        }
    }

    public componentWillMount(): void
    {
        this.setOptions();
    }

    public async setOptions()
    {
        const service = new AdminService();
        const employeesOptions = await service.getEmployeesOptions();
        const articlesOptions = await service.getArticleOptions();

        this.setState(Object.assign(this.state, {
            articles: articlesOptions,
            employees: employeesOptions
        }));
    }

    public async submit(data: Models.Client.INewReport)
    {
        const formData = getAsFormData<Models.Client.INewReport>(data);
        await axious.post(`${env.url}${env.endpoints.reports}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        });
        this.props.reset();

    }



    public render()
    {
        const {pristine, handleSubmit, invalid, reset} = this.props;

        return (
            <form action="" onSubmit={handleSubmit((e: Models.Client.INewReport) => this.submit(e))} className="report-form">

                <div className="form">
                    <TitleComponent text={"Добавление отчета"} icon="fa-newspaper-o"/>

                    <h5>Основная информация</h5>

                    <div className="row">
                        <div className="col-md-4">
                            <CategoryImageComponent icon="fa-pencil"/>
                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Название отчета</label>
                                <Field
                                  component={renderFormField}
                                  name="name"
                                  type="text"
                                  required={true}
                                  placeholder="Введите название отчета"
                                  validate={[required]}
                                  className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label>Номер темы из темплана</label>
                                <Field
                                  component={renderFormField}
                                  name="theme_number"
                                  type="text"
                                  required={true}
                                  placeholder="Например: 12"
                                  validate={[required]}
                                  className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label>Научные работы</label>
                                <Field component={props =>
                                  <Select
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                    options={this.state.articles}
                                    isMulti={true}
                                    placeholder="Выбрать"
                                  />}
                                       name="articles"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">

                            <div className="form-group">
                                <label>Дата</label>
                                <Field
                                  component={renderFormField}
                                  type="date"
                                  name="date"
                                  required={true}
                                  validate={[required]}
                                  className="form-control"/>
                            </div>

                        </div>
                        <div className="col-md-8">

                            <div className="form-group">
                                <label>Руководитель</label>
                                <Field component={props =>
                                  <Select
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                    options={this.state.employees}
                                    isMulti={false}
                                    placeholder="Выбрать"
                                  />}
                                       name="manager"
                                />
                                {/*
                                    <Field
                                        component="select"
                                        name="manager"
                                        className="form-control">
                                        <option value="1">Петров</option>
                                    </Field>
                                    */}
                            </div>

                            <div className="form-group">
                                <label>Исполнители</label>
                                <Field component={props =>
                                  <Select
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                    options={this.state.employees}
                                    isMulti={true}
                                    placeholder="Выбрать"
                                  />
                                }
                                       name="employees"
                                />
                                {/*
                                    <Field
                                        name="employees"
                                        component="select"
                                        className="form-control">
                                        <option value="1">Петров</option>
                                    </Field>
                                    */}

                            </div>

                        </div>

                    </div>
                    <br/>
                    <h5>Файлы</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label> Краткий отчет</label>
                                <div className="custom-file">
                                    <Field
                                        component={FileInput}
                                        placeholder="Файл краткого отчета"
                                        validate={[required]}
                                        name="short_report"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label> Полный отчет</label>
                                <div className="custom-file">
                                    <Field
                                        component={FileInput}
                                        placeholder="Файл полного отчета"
                                        validate={[required]}
                                        name="full_report"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label> Презентация</label>
                            <div className="custom-file">
                                <Field
                                    component={FileInput}
                                    placeholder="Файл презентации"
                                    validate={[required]}
                                    name="presentation"/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <p className="small text-muted">* Все поля обязательны для заполнения</p>
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
})(ReportComponent);

export default connect()(reduxFormAddReport);
