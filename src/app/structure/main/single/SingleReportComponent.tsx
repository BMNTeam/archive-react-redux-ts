import * as React from "react";

export class SingleReportComponent extends React.Component<any, any> {

    public render(): React.ReactNode
    {
        const id = this.props.match.params.id;
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h2>Название отчета: {id}</h2>
                        <h5>Номер отчета: 234</h5>
                    </div>
                </div>
                <br/>
                <h3>Дополнительная информация</h3>

                <div className="row">
                    <div className="col-sm-6">
                        <h5>Авторы</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item pl-0">Год</li>
                            <li className="list-group-item pl-0">Месяц</li>
                            <li className="list-group-item pl-0">Число</li>
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <h5>Дата</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item pl-0">Год</li>
                            <li className="list-group-item pl-0">Месяц</li>
                            <li className="list-group-item pl-0">Число</li>
                        </ul>
                    </div>
                </div>

                <h3>Документы</h3>



            </div>
        )
    }
}