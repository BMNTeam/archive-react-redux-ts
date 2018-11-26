import * as React from "react";
import "./card.component.css";
class CardComponent extends React.Component
{
    public render()
    {
        return (
            <div className="card border-light mb-3">
                <div className="card-header bg-transparent">Авторы</div>
            <div className="card-body">
                <h5 className="card-title">Название</h5>
                <p className="card-text">Найденные взождения</p>
            </div>
                <br/>

        </div>)
    }
}
export default CardComponent;