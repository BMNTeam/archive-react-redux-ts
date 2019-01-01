import * as React from "react";
import Header from "./structure/header/HeaderComponent";
import MainComponent from "./structure/main/MainComponent";

class AppComponent extends React.Component
{
    public render()
    {
        return(
            <div className='inherit'>
                <Header/>
                <MainComponent/>
                <footer/>
            </div>
        );
    }
}


export default AppComponent;