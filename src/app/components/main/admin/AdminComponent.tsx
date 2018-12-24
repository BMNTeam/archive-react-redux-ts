import * as React from "react";
import {connect} from "react-redux";
import Select from "react-select";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import FileInput from "../../shared/FileInput";
import {renderFormField} from "../../shared/RenderFormField";
import "./admin-component.css";


const required = (value:string) => value ? undefined : 'Поле обязательно для заполнения';

const options = [
    { value: 'chocolate', label: 'Иванов' },
    { value: 'strawberry', label: 'Петров' },
    { value: 'vanilla', label: 'Сидоров' }
];

class AdminComponent extends React.Component<InjectedFormProps> {
    constructor(props: InjectedFormProps)
    {
        super(props);
    }

    public submit(e: object)
    {
       console.log(123);
    }
    public render()
    {
        const {pristine, handleSubmit, invalid, reset} = this.props;

        return (
                <form action="" onSubmit={handleSubmit((e) => this.submit(e))} className="report-form">

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
                                        name="report_name"
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
                                    <Select
                                        options={options}
                                        isMulti={false}
                                        placeholder="Выбрать"
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
                                    <Select
                                        options={options}
                                        isMulti={true}
                                        placeholder="Выбрать"
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
                                            name="short_report"/>
                                        <label className="custom-file-label">Выберите файл краткого отчета</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label> Полный отчет</label>
                                    <div className="custom-file">
                                        <Field
                                            component={FileInput}
                                            name="full_report"/>
                                        <label className="custom-file-label">Выберите файл полного отчета</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label> Презентация</label>
                                <div className="custom-file">
                                    <Field
                                        component={FileInput}
                                        name="presentation"/>
                                    <label className="custom-file-label">Выберите файл презентации</label>
                                </div>
                            </div>
                        </div>
                    </div>

                   <div className="footer">
                       <div className="text-right pt-3 pb-3 bd-example">
                           <button type="button" onClick={reset} disabled={pristine} className="btn btn-outline-primary mr-3">Сбросить</button>
                           <button type="submit" disabled={invalid || pristine} className="btn btn-primary ">Отправить</button>
                       </div>
                   </div>
                </form>

        );
    }
}

const reduxFormAddReport=  reduxForm({
    form: 'reduxF'
})(AdminComponent);

export default connect()(reduxFormAddReport);
