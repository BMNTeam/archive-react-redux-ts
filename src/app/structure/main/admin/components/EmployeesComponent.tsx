import * as React from "react";
import {connect} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {env} from "../../../../env";
import {CategoryImageComponent} from "../../../../shared/category-image/category-image.component";
import {TitleComponent} from "../../../../shared/title/title.component";
import {renderFormField} from "../../../shared/RenderFormField";
import "./form-component.scss";

import axious from "axios";
import {required} from "../../../shared/Validations";

interface IEmployee {
    degree: string;
    name: string;
    position: string;
}

class EmployeesComponent extends React.Component<InjectedFormProps> {
    constructor(props: InjectedFormProps)
    {
        super(props);
    }

    public async submit(data: IEmployee)
    {
        const r = await axious.post(`${env.url}${env.endpoints.employees}`, data);
        if (r.status === 200)
        {
            this.props.reset();
        }
    }



    public render()
    {
        const {pristine, handleSubmit, invalid, reset} = this.props;

        return (
            <form action="" onSubmit={handleSubmit((e: IEmployee) => this.submit(e))} className="report-form">

                <div className="form">
                    <TitleComponent text="Добавление сотрудника" icon="fa-user-plus"/>
                    <div className="row">
                        <div className="col-md-4">
                            <CategoryImageComponent icon="fa-user-secret"/>


                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Ф.И.О.</label>
                                <Field
                                  component={renderFormField}
                                  name="name"
                                  type="text"
                                  required={true}
                                  placeholder="Например: Иванов Иван Иванович"
                                  validate={[required]}
                                  className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Степень</label>
                                <Field
                                    component={renderFormField}
                                    name="degree"
                                    type="text"
                                    required={true}
                                    placeholder="Например: доцент"
                                    validate={[required]}
                                    className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Должность</label>
                                <Field
                                    component={renderFormField}
                                    name="position"
                                    type="text"
                                    required={true}
                                    placeholder="Например: младший сотрудник"
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
})(EmployeesComponent);

export default connect()(reduxFormAddReport);
