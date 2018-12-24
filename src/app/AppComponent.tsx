import * as React from "react";
import Header from "./components/header/HeaderComponent";
import MainComponent from "./components/main/MainComponent";

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