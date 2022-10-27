import React from "react";
import Clock from "./components/clock/Clock";
import "./App.css";
import LogoImg from './images/dente-tempo-logo-horizontal.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {/* <h1>Dente Tempo</h1> */}
        <img src={LogoImg} alt='Dente Tempo Logo' className='dente-tempo-logo'/>
        <Clock/>
      </header>
    </div>
  );
}

export default App;
