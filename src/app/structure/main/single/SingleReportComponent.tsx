import * as React from "react";
import {TextWithLinkComponent} from "./TextWithLinkComponent";

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
                <div className="row">
                    <div className="col-sm-12">
                        <TextWithLinkComponent link="http://123" name="Тестовый отчет"
                                               text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from  by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
                        />
                    </div>
                </div>





            </div>
        )
    }
}