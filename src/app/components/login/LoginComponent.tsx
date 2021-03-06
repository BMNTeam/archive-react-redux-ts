import "./login.component.css";

import * as React from "react";
import {connect} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {IAuthentication, loginUser} from "../../services/auth/auth.actions";
import {IAction} from "../../shared/types";
import {IState} from "../../store";


export interface ILogin {
   error?: string;
   authenticated: boolean;
}

class LoginComponent extends React.Component<InjectedFormProps & {loginUser: (values: IAuthentication) => void, errorMessage: string} , any>
{
    constructor(props: any)
    {
        super(props);
        this.submit = this.submit.bind(this);
    }

    public submit(values: IAuthentication)
    {
        this.props.loginUser(values);
    }
    public render()
    {
        const { pristine, handleSubmit } = this.props;
        return(
            <div className="form-wrapper">
                <div className="form bg-white p-4">
                    <form onSubmit={handleSubmit(this.submit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" component="input" type="email" className="form-control" placeholder="Введите email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Пароль</label>
                            <Field name="password" component="input" type="password" className="form-control"
                                   placeholder="Пароль" />
                        </div>

                        <p className={ !this.props.errorMessage ? 'invisible text-danger' : 'text-danger'} role="alert">
                          Неверное имя пользователя или пароль
                        </p>
                        <button disabled={pristine} type="submit" className="btn btn-primary float-right">Войти</button>
                    </form>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IState)
{
    return {errorMessage: state.login.error}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, null, IAction<string>>) => ({
    loginUser: (data: IAuthentication) => dispatch(loginUser(data)),
});

const reduxFormSignIn =  reduxForm({
    form: 'login'
})(LoginComponent);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSignIn)