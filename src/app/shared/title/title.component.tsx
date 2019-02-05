import * as React from "react";

import "./title.component.scss";


interface ITitleProps {
  icon?: string;
  text: string
}

export class TitleComponent extends React.Component<ITitleProps, any> {

  constructor(props: any)
  {
    super(props);
  }
  public render(): React.ReactNode
  {
    const icon = this.props.icon || "fa-institution";
    const classes = `fa ${icon} text-primary`;

    return (
      <div className="row header">
        <h2 className="elegantshadow pl-3"><i className={classes}/>{this.props.text}</h2>
      </div>
    )
  }

}