import axious from "axios";
import * as React from "react";
import {Link} from "react-router-dom";
import {env} from "../../../../env";
import {Loading} from "../../../../shared/loading.component";
import {TitleComponent} from "../../../../shared/title/title.component";
import IReference = Models.Server.IReference;

interface IReferencesState {
  references?: IReference[]
}
export class ReferencesComponent extends React.Component<any, IReferencesState> {
  constructor(props: object)
  {
    super(props);
    this.state = {
      references: undefined
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
        <TitleComponent text="Все справки"/>
        {!this.state.references
        ? <Loading/>
        : getReportsTable(this.state.references.reverse())
        }
      </div>
    )
  }

  private async getReports()
  {
    const res = await axious.get<IReference[]>(`${env.url}/${env.endpoints.references}`);
    if(res.status === 200)
    {
      this.setState({...this.state, references: res.data});
    }
  }
}


const getReportsTable = (reporst: IReference[]) =>(
  <div>
    <table className="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Название</th>
        <th scope="col">Дата</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
      <tbody>

      {reporst.map((r, i) => (
        <tr key={r.id}>
          <td>{++i}</td>
          <td>{r.name}</td>
          <td>{new Date(+r.date * 1000).getFullYear()}</td>
          <td><Link to={`/single/reference/${r.id}`}> <i className="fa fa-sign-in"/> Перейти </Link></td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
);