import * as React from "react";
import {connect} from "react-redux";
import Select from "react-select";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {env} from "../../../env";
import FileInput from "../../shared/FileInput";
import {renderFormField} from "../../shared/RenderFormField";
import "./admin-component.scss";

import axious from "axios";

const required = (value: string) => value ? undefined : 'Поле обязательно для заполнения';

const options = [
    {value: 'chocolate', label: 'Иванов'},
    {value: 'strawberry', label: 'Петров'},
    {value: 'vanilla', label: 'Сидоров'}
];

class AdminComponent extends React.Component<InjectedFormProps> {
    constructor(props: InjectedFormProps)
    {
        super(props);
    }

    public async submit(data: IReport)
    {
        const formData = new FormData();
        Object.entries(data).map(([k, v]) => {
            formData.append(k, this.stringifyIfObject(v));
        });
        const r = await axious.post(`${env.url}${env.endpoints.reports}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        });
        console.dir(r);
    }



    public render()
    {
        const {pristine, handleSubmit, invalid, reset} = this.props;

        return (
            <form action="" onSubmit={handleSubmit((e: IReport) => this.submit(e))} className="report-form">

                <div className="header">
                    <h2>Добавление отчета</h2>
                    <br/>
                </div>

                <div className="form">
                    <h5>Основная информация</h5>

                    <div className="row">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Руководитель</label>
                                <Field component={props =>
                                    <Select
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        options={options}
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
                                        options={options}
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

    private stringifyIfObject (obj: Blob | string)
    {
        if (typeof obj === 'object' && !(obj !instanceof Blob))
        {
            return JSON.stringify(obj);
        }
        return obj
    }
}

const reduxFormAddReport = reduxForm({
    form: 'reduxF'
})(AdminComponent);

export default connect()(reduxFormAddReport);
