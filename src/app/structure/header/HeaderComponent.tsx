import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {logoutUser} from "../../services/auth/auth.actions";
import {IAction} from "../../shared/types";
import {IState} from "../../store";
import {DropdownMenu} from "./DropdownAddMenu";

class Header extends React.Component<{logoutUser: () => undefined, node: HTMLElement}, any> {
    constructor(props: any)
    {
        super(props);

        this.state = {
            dropdown: false
        }
    }


    public toggleDropdown(value?: boolean)
    {
        this.setState(Object.assign(this.state, {
            dropdown: value === undefined ? !this.state.dropdown : value
        }));
    }

    public render()
    {
        return (
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">СНИИСХ</h5>

                <nav className="navbar navbar-expand-lg my-2 my-md-0 mr-md-3">
                    <ul className="navbar-nav ">
                        <li className="nav-item"><Link to="/search" className="p-2 text-dark">Поиск</Link></li>
                        <li className="nav-item dropdown">
                            <a className="p-2 text-dark dropdown-toggle" onClick={() => this.toggleDropdown()} role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Добавить
                            </a>
                            {this.state.dropdown && <DropdownMenu toggleDropdown={v => this.toggleDropdown(v)}/>}

                        </li>
                    </ul>
                </nav>
                <a className="btn btn-outline-primary" onClick={this.props.logoutUser}>Выйти</a>
            </div>)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, null, IAction<string>>) => ({
    logoutUser: () => dispatch(logoutUser()),
});



export default connect(null, mapDispatchToProps)(Header);