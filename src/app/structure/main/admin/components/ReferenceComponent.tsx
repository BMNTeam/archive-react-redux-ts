import axious from "axios";
import * as React from "react";
import {connect} from "react-redux";
import Select from "react-select";
import {OptionsType} from "react-select/lib/types";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {env} from "../../../../env";
import {CategoryImageComponent} from "../../../../shared/category-image/category-image.component";
import {
    getDefaultNotification,
    INotification,
    Nofification,
    NotificationType
} from "../../../../shared/notifications.component";
import {TitleComponent} from "../../../../shared/title/title.component";
import FileInput from "../../../shared/FileInput";
import {renderFormField} from "../../../shared/RenderFormField";
import {required} from "../../../shared/Validations";
import {AdminService} from "../admin-service";
import {getAsFormData} from "../admin-shared";
import "./form-component.scss";

type IReference = Models.Client.IReference;

interface IOpitons {
    articles: OptionsType<number>;
    employees: OptionsType<number>;
    notification: INotification;
}

class ReferenceComponent extends React.Component<InjectedFormProps, IOpitons> {
    public sending: boolean;

    constructor(props: InjectedFormProps)
    {
        super(props);
        this.state = {
            articles: [],
            employees: [],
            notification: getDefaultNotification()
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

    public async submit(data: IReference)
    {
        const formData = getAsFormData<IReference>(data);
        this.sending = true;
        const res = await axious.post(`${env.url}${env.endpoints.references}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        });
        this.sending = false;
        if(res.status === 200)
        {
            this.setState({...this.state, notification: {type: NotificationType.Success, text: "Отчет успешно добалвен"}});
            this.props.reset();
            return;
        }


    }



    public render()
    {
        const {pristine, handleSubmit, invalid, reset} = this.props;

        return (
            <form onSubmit={handleSubmit((e: IReference) => this.submit(e))} className="report-form">

                <div className="form">
                    <TitleComponent text="Добавление справки" icon="fa-info-circle"/>
                    <h5>Основная информация</h5>

                    <div className="row">
                        <div className="col-md-4">
                            <CategoryImageComponent icon="fa-language"/>
                        </div>
                        <div className="col-md-8 select-fix">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Название</label>
                                <Field
                                  component={renderFormField}
                                  name="name"
                                  type="text"
                                  required={true}
                                  placeholder="Введите название справки"
                                  validate={[required]}
                                  className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label>Номер</label>
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

                    </div>


                    <br/>
                    <h5>Файлы</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label> Файл справки</label>
                                <div className="custom-file">
                                    <Field
                                        component={FileInput}
                                        placeholder="Файл краткого отчета"
                                        validate={[required]}
                                        name="text"/>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-12">
                            <p className="small text-muted">* Все поля обязательны для заполнения</p>
                        </div>
                    </div>
                    <Nofification type={this.state.notification.type} text={this.state.notification.text}/>
                </div>

                <div className="footer">
                    <div className="text-right pt-3 pb-3 bd-example">
                        <button type="button" onClick={reset} disabled={pristine}
                                className="btn btn-outline-primary mr-3">Сбросить
                        </button>
                        <button type="submit" disabled={invalid || pristine || this.sending} className="btn btn-primary ">Отправить
                        </button>
                    </div>
                </div>
            </form>

        );

    }


}

const reduxFormAddReport = reduxForm({
    form: 'reduxF'
})(ReferenceComponent);

export default connect()(reduxFormAddReport);
