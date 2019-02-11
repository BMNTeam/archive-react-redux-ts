import axious from "axios";
import * as React from "react";
import {env} from "../../../env";
import {CategoryImageComponent} from "../../../shared/category-image/category-image.component";
import {TitleComponent} from "../../../shared/title/title.component";
import {getArticlesTable} from "../admin/components/ArticleComponent";
import {getEmployesTable} from "../admin/components/EmployeesComponent";
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
    const isReport = this.props.match.params.type === "report";
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
          <div className="col-md-3">
            {isReport
              ? <CategoryImageComponent icon="fa-address-card" size={2}/>
              : <CategoryImageComponent icon="fa-language"/>
            }
          </div>
          <div className="col-md-9">
            <p>
              <b>Номер:</b> {this.state.data.theme_number}
            </p>
            <p>
              <b>Дата: </b>
              <span>{`${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`}</span>
            </p>
            {data.manager && data.manager.id
              ? getManager(data.manager, '')
              : <span>Нет данных о руководителе</span>
            }
          </div>

        </div>
        <h5>Авторы</h5>
        {getEmployesTable(data.employees, data.manager)}


        <br/>
        <h3>Документы</h3>
        <div className="row">
          {isReport
            ? getReportFiles(data as IReport)
            : getReferenceFile(data as IReference)
          }
        </div>

        {isReport && getArticlesTable(data.articles)}
        <br/><br/>
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



const getManager = (m: IEmployee, icon: string) =>
{
  const i = `fa ${icon}`;
  return (
    <div key={m.id}>
      <b>Руководитель: </b>
      <i className={i}/> {m.full_name}
      <span className="text-muted"> <i className="fa fa-shield"/> {m.position}</span>
    </div>
  )
};