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
import IJournal = Models.Server.IJournal;

interface IJournalState {
    journals?: IJournal[];
    notification: INotification;
}

class JournalComponent extends React.Component<InjectedFormProps, IJournalState> {

    constructor(props: InjectedFormProps)
    {
        super(props);
        this.state = {
            journals: undefined,
            notification: getDefaultNotification()
        }
    }

    public componentWillMount(): void
    {
        this.getData();
    }

    public async submit(data: Models.Client.IJournal)
    {
        const r = await axious.post(`${env.url}${env.endpoints.journals}`, data);
        if (r.status === 200)
        {
            this.setState({...this.state, notification: {type: NotificationType.Success, text: "Журнал успешно добавлен"}})
            this.props.reset();
        }
    }

    public render()
    {
        const {pristine, handleSubmit, invalid, reset} = this.props;

        return (
            <form action="" onSubmit={handleSubmit((e: Models.Client.IJournal) => this.submit(e))} className="report-form">

                <div className="form">
                    <TitleComponent text="Добавление журнала" icon="fa-quote-right"/>
                    <div className="row">
                        <div className="col-md-4">
                            <CategoryImageComponent icon="fa-graduation-cap"/>

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
                    <ExistingData heading="Загруженные журналы" data={
                        this.state.journals
                          ? getJournalsTable(this.state.journals)
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
        const res = await axious.get(`${env.url}/${env.endpoints.journals}`);
        this.setState({...this.state, journals: res.data})
    }

}

export const getJournalsTable = (articles: IJournal[]) => (
  <div>
      <table className="table table-hover">
          <thead>
          <tr>
              <th scope="col">#</th>
              <th scope="col">Названия</th>
              <th scope="col">Ссылка</th>
          </tr>
          </thead>
          <tbody>

          {articles.map((j, i) => (
            <tr key={j.id}>
                <td>{++i}</td>
                <td>{j.name}</td>
                <td>{j.url}</td>
            </tr>
          ))}
          </tbody>
      </table>
  </div>

);

const reduxF = reduxForm({
    form: 'reduxF'
})(JournalComponent);

export default connect()(reduxF);
