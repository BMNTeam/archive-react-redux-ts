import {RefObject} from "react";
import * as React from "react";
import {Link} from "react-router-dom";

export class DropdownMenu extends React.Component<{ toggleDropdown: (v?: boolean) => void}, any>
{
    private node: RefObject<HTMLDivElement>;

    constructor(props: { toggleDropdown: (v?: boolean) => void})
    {
        super(props);
        this.node = React.createRef<HTMLDivElement>();
        this.handleClick  = this.handleClick.bind(this);

    }
    public componentWillMount(): void
    {
        document.addEventListener('click', this.handleClick, false);
    }

    public componentWillUnmount()
    {
        document.removeEventListener('click', this.handleClick, false);
    }


    public handleClick(e: MouseEvent)
    {
        if(this.node.current!.contains(e.target as Node) && !(e.target instanceof HTMLAnchorElement))
        {
            return;
        }
        this.props.toggleDropdown(false);
    }

    public render()
    {
        return (
            <div ref={this.node} className='dropdown-menu show' aria-labelledby="navbarDropdown">
                <Link to="/admin" className="dropdown-item">Отчет</Link>
                <Link to="/admin" className="dropdown-item">Справку</Link>
                <div className="dropdown-divider" />
                <Link to="/employees" className="dropdown-item">Сотрудника</Link>
                <Link to="/article" className="dropdown-item">Статью</Link>
                <Link to="/journal" className="dropdown-item">Журнал</Link>
            </div>
        )
    }
}