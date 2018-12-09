import * as React from "react";


class AdminComponent extends React.Component {
    public render()
    {
        return (
            <div >
                <h6>Введите данные отчета</h6>
                <br/><br/>
                <form action="">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Название отчета</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1"
                                       placeholder=""/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Файл отчета</label>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="validatedCustomFile" />
                                    <label className="custom-file-label" htmlFor="validatedCustomFile">Выберите файл</label>
                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br/>
                    <button type="submit" className="btn btn-primary">Отправить</button>
                </form>

            </div>
        );
    }
}

export default AdminComponent;
