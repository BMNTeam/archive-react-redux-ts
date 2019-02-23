import axious from "axios";
import * as React from "react";
import {connect} from "react-redux";
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
import {renderFormField} from "../../../shared/RenderFormField";
import {required} from "../../../shared/Validations";
import {ExistingData} from "./existing-data.component";
import "./form-component.scss";
import IEmployee = Models.Client.IEmployee;

interface IEmployeesState {
  employees?: IEmployee[];
  notification: INotification;
}

class EmployeesComponent extends React.Component<InjectedFormProps, IEmployeesState> {
  constructor(props: InjectedFormProps)
  {
    super(props);
    this.state = {
      employees: undefined,
      notification: getDefaultNotification()
    }
  }

  public componentDidMount(): void
  {
    this.getData();
  }



  public async submit(data: IEmployee)
  {
    const r = await axious.post(`${env.url}${env.endpoints.employees}`, data);
    if (r.status === 200)
    {
      this.setState({...this.state,
        employees: this.state.employees && this.state.employees.concat(r.data).reverse() || undefined,
        notification: {type: NotificationType.Success, text: "Сотрудник успешно добавлен"}
      });
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
                  placeholder="Например: кандидат сельскохозяйственных наук"
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
          <ExistingData heading="Зарегистрированные сотрудники" data={
            this.state.employees
              ? getEmployesTable(this.state.employees)
              : undefined
          }/>
          <Nofification type={this.state.notification.type} text={this.state.notification.text}/>

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

  private async getData()
  {
    const employees = await axious.get<IEmployee[]>(`${env.url}/${env.endpoints.employees}`);
    this.setState({
      employees: employees.data
    });
  }


}

export const getEmployesTable = (emp: IEmployee[]) => (
  <table className="table table-hover">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Ф.И.О</th>
      <th scope="col">Должность</th>
      <th scope="col">Звание</th>
    </tr>
    </thead>
    <tbody>
    {emp.map((e, i) => (
      <tr key={e.id}>
        <td>{i + 2}</td>
        <td>{e.full_name}</td>
        <td>{e.position}</td>
        <td>{e.degree}</td>
      </tr>
    ))}
    </tbody>
  </table>
);

const reduxFormAddReport = reduxForm({
  form: 'reduxF'
})(EmployeesComponent);

export default connect()(reduxFormAddReport);
