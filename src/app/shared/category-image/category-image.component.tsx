import * as React from "react";
import "./category-image.component.scss";


interface ICategoryImageProps {
  icon?: string;
  size?: number
}
export class CategoryImageComponent extends React.Component<ICategoryImageProps, any>{
  constructor(props: ICategoryImageProps)
  {
    super(props);
  }

  public render()
  {
    const icon = this.props.icon ? this.props.icon : "fa-user";
    const size = this.props.size ? this.props.size * 5 : 15;

    return(
      <div className="category-image">
        <i className={`fa ${icon}`} style={{fontSize: size +`rem`}}/>
      </div>
    )
  }
}