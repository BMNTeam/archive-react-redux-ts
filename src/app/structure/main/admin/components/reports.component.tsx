import axious from "axios";
import * as React from "react";
import {Link} from "react-router-dom";
import {env} from "../../../../env";
import {Loading} from "../../../../shared/loading.component";
import {TitleComponent} from "../../../../shared/title/title.component";
import IReport = Models.Server.IReport;

interface IReportsState {
  reports?: IReport[]
}
export class ReportsComponent extends React.Component<any, IReportsState> {
  constructor(props: object)
  {
    super(props);
    this.state = {
      reports: undefined
    }
  }

  public componentWillMount(): void
  {
    this.getReports();
  }

  public render(): React.ReactNode
  {
    return (
      <div>
        <TitleComponent text="Все отчеты"/>
        {!this.state.reports
        ? <Loading/>
        : getReportsTable(this.state.reports.reverse())
        }
      </div>
    )
  }

  private async getReports()
  {
    const res = await axious.get<IReport[]>(`${env.url}/${env.endpoints.reports}`);
    if(res.status === 200)
    {
      this.setState({...this.state, reports: res.data});
    }
  }
}


const getReportsTable = (reporst: IReport[]) =>(
  <div>
    <table className="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Название</th>
        <th scope="col">Дата</th>
        <th scope="col">Руководитель</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
      <tbody>

      {reporst.map((r, i) => (
        <tr key={r.id}>
          <td>{++i}</td>
          <td>{r.name}</td>
          <td>{new Date(+r.date * 1000).toDateString()}</td>
          <td>{r.manager.full_name}</td>
          <td><Link to={`/single/report/${r.id}`}> <i className="fa fa-sign-in"/> Перейти </Link></td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
);