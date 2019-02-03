import * as React from "react";
import {env} from "../../../env";

interface ITextWithLinkProps {
  link: string;
  name: string;
  text?: string;

}

const limitHeight = {
  maxHeight: "100px",
  overflow: 'auto'
};

export class TextWithLinkComponent extends React.Component<ITextWithLinkProps, { small: boolean }> {

  public constructor(props: ITextWithLinkProps)
  {
    super(props);
    this.state = {
      small: true
    };
    this.toggleHeight = this.toggleHeight.bind(this);
  }

  public toggleHeight()
  {
    this.setState(
      {small: !this.state.small}
    )
  }

  public render(): React.ReactNode
  {
    const style = this.state.small ? limitHeight : undefined;
    return (
      <div className="row mb-2">
        <div className="col-md-6"><b>{this.props.name}</b></div>
        <div className="col-md-6 text-right">
          <a href={`${env.url}${env.endpoints.files}/?file=${this.props.link}`} target="_blank">
            <button title="Загрузить" className="btn btn-link"><i className="fa fa-download"/></button>
          </a>
        </div>
        {this.props.text &&
        <div className="col-md-12" style={style}>
          {this.props.text}
        </div>
        }
        {
          this.props.text &&
          <div className="col-md-12 text-right">
            <a href="#" onClick={this.toggleHeight}>
              {this.state.small &&
              <button title="Развернуть" className="btn btn-link"><i className=" fa fa-caret-down"/></button>}
              {!this.state.small &&
              <button title="Свернуть" className="btn btn-link"><i className="fa fa-caret-up"/></button>}
            </a>
          </div>
        }

      </div>
    )
  }
}