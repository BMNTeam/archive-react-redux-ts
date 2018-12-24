import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {logoutUser} from "../../services/auth/auth.actions";
import {IAction} from "../../shared/types";
import {IState} from "../../store";

class Header extends React.Component<{logoutUser: () => undefined}, any> {
    constructor(props: any)
    {
        super(props);

    }

    public render()
    {
        return (
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">СНИИСХ</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <Link to="/search" className="p-2 text-dark">Поиск</Link>
                    <Link to="/admin" className="p-2 text-dark">Добавить</Link>
                </nav>
                <a className="btn btn-outline-primary" onClick={this.props.logoutUser}>Выйти</a>
            </div>)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, null, IAction<string>>) => ({
    logoutUser: () => dispatch(logoutUser()),
});



export default connect(null, mapDispatchToProps)(Header);