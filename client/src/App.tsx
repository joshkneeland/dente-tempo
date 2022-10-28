import Clock from "./components/clock/Clock";
import "./App.css";
import LogoDesktop from './images/dente-tempo-logo-horizontal.svg';
import LogoMobile from './images/dente-tempo-logo-vertical.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={LogoDesktop} alt='Dente Tempo Logo' className='logo-desktop'/>
        <img src={LogoMobile} alt='Dente Tempo Logo' className='logo-mobile'/>
        <Clock/>
      </header>
    </div>
  );
}

export default App;
