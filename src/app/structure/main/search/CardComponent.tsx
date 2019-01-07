import * as React from "react";
import "./card.component.scss";
import IEmployee = Models.IEmployee;

interface ICardProps {
    authors: IEmployee[];
    id: number
    name: string;
    shortText: string;
}
class CardComponent extends React.Component<ICardProps>
{
    constructor(props: ICardProps)
    {
        super(props)
    }
    public render()
    {
        return (
            <div className="card border-light mb-3">
                <div className="card-header bg-transparent">{
                    this.props.authors.length
                        ? this.props.authors.map(a => <span key={a.id}>{a.full_name} </span>)
                        : <span>Авторы не указаны</span>
                }</div>
            <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">{this.props.shortText}</p>
            </div>
                <br/>

        </div>)
    }
}
export default CardComponent;