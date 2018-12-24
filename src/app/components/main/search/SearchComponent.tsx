import * as React from "react";
import CardComponent from "./CardComponent";

class SearchComponent extends React.Component {
    public render()
    {
        return (
            <div>
                <h3>Поиск</h3>
                <div className="input-group mb-3 mt-3">
                    <br/>

                    <input type="text" className="form-control" placeholder="Например: что-то интересное"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                            <i className="fas fa-search"/></button>
                    </div>
                </div>
                <br/>
                <h6>Результаты поиска</h6>
                <p className="small text-muted">Найдено 26 документов</p>
                {new Array(5).fill(1).map((i) => <CardComponent key={i}/>)}
            </div>


        )
    }
}

export default SearchComponent;
