import axious from "axios";
import * as React from "react";
import {env} from "../../../env";
import {TextWithLinkComponent} from "./TextWithLinkComponent";
import IReport = Models.Server.IReport;
import ISearchDataType = Search.ISearchDataType;

interface ISingleState {
  data?: IReport
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
    if(!this.state.data)
    {
      return <div/>;
    }

    const date = new Date(+this.state.data.date * 1000);
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>{this.state.data.name}</h2>
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
              {this.state.data.employees.length
                ? this.state.data.employees.map(i =>
                  <li key={i.id} className="list-group-item pl-0">
                    <i className="fa fa-address-card"/> {i.full_name} |
                    <span className="text-muted">{i.position}</span>
                  </li>)
                : "Нет данных об авторах"
              }
            </ul>
          </div>
        </div>
        <br/>
        <h3>Документы</h3>
        <div className="row">
          <div className="col-sm-12">
            <TextWithLinkComponent link={this.state.data.short_report_url} name="Краткий отчет"
                                   text={this.state.data.short_report_text}
            />
            <TextWithLinkComponent link={this.state.data.full_report_url} name="Полный отчет"
                                   text={this.state.data.full_report_text}/>
            <TextWithLinkComponent link={this.state.data.presentation_url} name="Презентация"/>
          </div>
        </div>


      </div>
    )
  }

  private async getData(id: string, type: ISearchDataType): Promise<any> // TODO: get rid of any specify Report or Reference;
  {
    const res = await axious.get<IReport>(`${env.url}${env.endpoints.singleSearch}/${this.props.match.params.type}/${this.props.match.params.id}`);
    const data = res.data;
    this.setState({...this.state, data});
  }

}