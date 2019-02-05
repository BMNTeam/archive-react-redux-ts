import axious from "axios";
import * as React from "react";
import {env} from "../../../env";
import {TitleComponent} from "../../../shared/title/title.component";
import {TextWithLinkComponent} from "./TextWithLinkComponent";
import IEmployee = Models.Server.IEmployee;
import IReference = Models.Server.IReference;
import IReport = Models.Server.IReport;
import ISearchDataType = Search.ISearchDataType;

interface ISingleState {
  data?: IReport | IReference
}

export class SingleReportComponent extends React.Component<any, ISingleState> {

  constructor(state: ISingleState)
  {
    super(state);
    this.state = {
      data: undefined
    }
  }

  public componentDidMount(): void
  {
    this.getData(this.props.match.params.id, this.props.match.params.type);
  }

  public render(): React.ReactNode
  {
    if (!this.state.data)
    {
      return <div/>;
    }
    const {data} = this.state;
    const date = new Date(+this.state.data.date * 1000);
    return (
      <div>
        <TitleComponent text={data.name}/>
        <div className="row">
          <div className="col-md-12">

            <h5>№: {this.state.data.theme_number}</h5>
          </div>
        </div>
        <br/>
        <h3>Дополнительная информация</h3>

        <div className="row">

          <div className="col-sm-6">
            <h5>Дата</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item pl-0">Год: {date.getFullYear()}</li>
              <li className="list-group-item pl-0">Месяц: {date.getMonth() + 1}</li>
              <li className="list-group-item pl-0">Число: {date.getDay() + 1}</li>
            </ul>
          </div>
          <div className="col-sm-6">
            <h5>Авторы</h5>
            <ul className="list-group list-group-flush">
              {data.manager && data.manager.id
                ? getEmployeesList([data.manager], '', true)
                : <li>Нет данных о руководителе</li>
              }
              {data.employees.length
                ? getEmployeesList(data.employees, 'fa-address-card')
                : "Нет данных об авторах"
              }
            </ul>
          </div>
        </div>
        <br/>
        <h3>Документы</h3>
        <div className="row">
          { this.props.match.params.type === "report"
            ? getReportFiles(data as IReport)
            : getReferenceFile(data as IReference)
          }
        </div>


      </div>
    )
  }

  private async getData(id: string, type: ISearchDataType): Promise<void>
  {
    const res = await axious.get<IReport>(`${env.url}${env.endpoints.singleSearch}/${this.props.match.params.type}/${this.props.match.params.id}`);
    const data = res.data;
    this.setState({...this.state, data});
  }

}


const getReportFiles = (data: IReport) => (
  <div className="col-sm-12">
    <TextWithLinkComponent link={data.short_report_url} name="Краткий отчет"
                           text={data.short_report_text}
    />
    <TextWithLinkComponent link={data.full_report_url} name="Полный отчет"
                           text={data.full_report_text}/>
    <TextWithLinkComponent link={data.presentation_url} name="Презентация"/>
  </div>
);

const getReferenceFile = (data: IReference) => (
  <div className="col-sm-12">
    <TextWithLinkComponent link={data.url} name="Содержимое справки"
                           text={data.text}
    />
  </div>
);
const getEmployeesList = (employees: IEmployee[], icon: string, isManager = false) =>
{
  const i = `fa ${icon}`;
  return employees.map(e =>
  {
    return (
      <li key={e.id} className="list-group-item pl-0">
        {isManager ? <b>Руководитель: </b> : ""}
        <i className={i}/> {e.full_name}
        <span className="text-muted"> <i className="fa fa-shield"/> {e.position}</span>
      </li>
    )
  })
};