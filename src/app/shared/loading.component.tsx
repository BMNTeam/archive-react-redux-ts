import * as React from "react";

export class Loading extends React.Component{
  public render()
  {
    return(
      <div className="w-100 h-100 text-center">
        <div  className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}