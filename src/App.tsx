import * as React from 'react';
import './App.css';
import Header from "./app/components/header/HeaderComponent";
import MainComponent from "./app/components/main/MainComponent";


class App extends React.Component {
    public render()
    {
        return (

            <div className="main-container">

                <Header/>
                <MainComponent/>
                <footer/>

            </div>
        );
    }
}

export default App;
