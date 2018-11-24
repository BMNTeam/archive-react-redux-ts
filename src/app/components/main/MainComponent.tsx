import * as React from "react";
import SearchComponent from "./search/SearchComponent";

class MainComponent extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="container">
                <SearchComponent/>
            </div>
        )
    }
}

export default MainComponent;