import * as React from "react";
import {Loading} from "../../../../shared/loading.component";

interface IExisingData {
  heading: string;
  data?: any
}
export class ExistingData extends React.Component<IExisingData> {
  constructor(data: IExisingData)
  {
    super(data);
  }
  public render()
  {
    return(
      <div className="overflow-auto" style={{maxHeight: 500}}>
        <h5>{this.props.heading}</h5>
        {this.props.data
          ? this.props.data
          :<Loading/>
        }
      </div>
    )
  }
}