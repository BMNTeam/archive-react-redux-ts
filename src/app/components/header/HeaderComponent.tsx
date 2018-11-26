import * as React from "react";

class Header extends React.Component<any, any> {
    public render()
    {
        return (
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">СНИИСХ</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-dark" href="#">К поиску</a>

                </nav>
                <a className="btn btn-outline-primary" href="#">Выйти</a>
            </div>)
    }
}

export default Header;