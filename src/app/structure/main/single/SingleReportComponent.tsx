import axious from "axios";
import * as React from "react";
import {env} from "../../../env";
import {TextWithLinkComponent} from "./TextWithLinkComponent";
import IReport = Models.IReport;
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
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Название отчета: {this.state.data.name}</h2>
            <h5>Номер отчета: {this.state.data.themeNumber}</h5>
          </div>
        </div>
        <br/>
        <h3>Дополнительная информация</h3>

        <div className="row">
          <div className="col-sm-6">
            <h5>Авторы</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item pl-0">Год</li>
              <li className="list-group-item pl-0">Месяц</li>
              <li className="list-group-item pl-0">Число</li>
            </ul>
          </div>
          <div className="col-sm-6">
            <h5>Дата</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item pl-0">Год</li>
              <li className="list-group-item pl-0">Месяц</li>
              <li className="list-group-item pl-0">Число</li>
            </ul>
          </div>
        </div>

        <h3>Документы</h3>
        <div className="row">
          <div className="col-sm-12">
            <TextWithLinkComponent link="http://123" name="Краткий отчет"
                                   text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of

"
            />
            <TextWithLinkComponent link="http://123" name="Полный отчет"
                                   text=""/>
            <TextWithLinkComponent link="http://123" name="Презентация"/>
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