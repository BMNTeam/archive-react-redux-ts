// import {IAuthentication, loginUser} from "../../services/auth/auth.actions";
import "./login.component.css";

import * as React from "react";
// import {connect, DispatchProp} from "react-redux";
import {Field, reduxForm} from "redux-form";






class LoginComponent extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props)
    }
    public render()
    {
        const { pristine } = this.props;
        return(
            <div className="form-wrapper">
                <div className="form bg-white p-4">
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" component="input" type="email" className="form-control" placeholder="Введите email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Пароль</label>
                            <Field name="password" component="input" type="password" className="form-control"
                                   placeholder="Пароль" />
                        </div>
                        {/*<div className="form-check">*/}
                            {/*<input type="checkbox" className="form-check-input" />*/}
                            {/*<label className="form-check-label">Запомнить этот компьютер</label>*/}
                        {/*</div>*/}
                        <br/>
                        <button disabled={pristine} type="submit" className="btn btn-primary float-right">Войти</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login'
})(LoginComponent as any); // TODO: get rid of any