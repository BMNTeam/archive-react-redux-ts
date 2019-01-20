import * as React from "react";

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
        <div className="col-md-6 text-right"><a href={this.props.link}>Скачать</a></div>
        {this.props.text &&
        <div className="col-md-12" style={style}>
          {this.props.text}
        </div>
        }
        {
          this.props.text &&
          <div className="col-md-12 text-right">
            <a href="#" onClick={this.toggleHeight}>
              {this.state.small && <span>Развернуть</span>}
              {!this.state.small && <span>Свернуть</span>}
            </a>
          </div>
        }

      </div>
    )
  }
}