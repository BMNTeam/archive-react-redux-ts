import * as React from "react";
import {Link} from "react-router-dom";
import "./card.component.scss";
import IEmployee = Models.Client.IEmployee;
import ISearchDataType = Search.ISearchDataType;

interface ICardProps {
    authors: IEmployee[];
    id: number
    name: string;
    text: string;
    type: ISearchDataType;
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
                <h5 className="card-title">
                    <Link to={`/single/${this.props.type}/${this.props.id}`}>{this.props.name}</Link>
                    </h5>
                <p className="card-text">{this.props.text}</p>
            </div>
                <br/>

        </div>)
    }


}
export default CardComponent;