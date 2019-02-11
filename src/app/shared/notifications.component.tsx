import * as React from "react";
export enum NotificationType {Error, Success, None};

export interface INotification {
  type: NotificationType,
  text?: string
}
export const getDefaultNotification = ():INotification  => ({type: NotificationType.None, text: ""});
export class Nofification extends React.Component<INotification> {
  public render()
  {
    if(this.props.type === NotificationType.None) {return ("")};

    const type = this.props.type === NotificationType.Error ? "alert-danger" : "alert-success";
    return (
      <div className={`alert ${type}`} role="alert">
        {this.props.text || "Действие успешно завершено"}
      </div>
    )
  }
}