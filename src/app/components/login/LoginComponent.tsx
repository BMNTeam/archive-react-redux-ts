import * as React from "react";
import "./login.component.css";

class LoginComponent extends React.Component
{
    public render()
    {
        return(
            <div className="form-wrapper">
                <div className="form bg-white p-4">
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Пароль</label>
                            <input type="password" className="form-control"
                                   placeholder="Password" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" />
                            <label className="form-check-label">Запомнить этот компьютер</label>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary float-right">Войти</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginComponent;