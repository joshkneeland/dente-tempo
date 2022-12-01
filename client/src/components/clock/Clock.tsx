import React, { useState, useEffect } from "react";
import "./Clock.css";
import CallTimer from "../../functions/CallTimer";

function Clock() {
  let timerSecStorage = localStorage.getItem('timerSecStorage');
  let timerMinStorage = localStorage.getItem('timerMinStorage');
  let timerHrStorage  = localStorage.getItem('timerHrStorage');

  // Initialize state variables
  const [time, setTime] = useState({ date: new Date() });
  const [timerSwitch, setTimerSwitch] = useState(false);
  const [timerOneHr, setTimerOneHr] = useState(Number(timerHrStorage) || 0);
  const [timerOneMin, setTimerOneMin] = useState(Number(timerMinStorage) || 0);
  const [timerOneSec, setTimerOneSec] = useState(Number(timerSecStorage) || 0);

  // Changes which timer is currently running
  const clickTimerBtn = () => {
    setTimerSwitch(!timerSwitch);
  }

  const resetTimer = () => {
    window.localStorage.clear();
    setTimerOneHr(0);
    setTimerOneMin(0);
    setTimerOneSec(0);
  }

  const setTimezone = () => {
    const shortDate = new Date().toLocaleTimeString('en-us', {timeZoneName: 'short'});
    return shortDate.split(' ')[2];
    // console.log(shortDate.split(' ')[2]); // EST
  }

  // Initialize on page load
  useEffect(() => {
    // Fetch API returns a boolean that compares current date w/the last visit to the site
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch("http://localhost:8000/", requestOptions)
      .then((response) => response.json())
      .then((data) => {  
        if(data.resetTimeVal) {
          resetTimer();
        }
      });

    return () => {
      localStorage.setItem('timerSecStorage', String(timerOneSec));
      localStorage.setItem('timerMinStorage', String(timerOneMin));
      localStorage.setItem('timerHrStorage', String(timerOneHr));
    };
  }, []);

  setInterval(() => {
    setTime({
      date: new Date(),
    });
  }, 1000);

  useEffect(() => {
    if (timerSwitch) {
      // Aligners are in, setTimerOne functions are called
      CallTimer(
        setTimerOneSec,
        setTimerOneMin,
        setTimerOneHr,
        timerOneSec,
        timerOneMin,
        timerOneHr,
        time
      );
    } 
  }, [time.date.toLocaleTimeString()]);

  window.onbeforeunload = (e) => {
    localStorage.setItem('timerSecStorage', String(timerOneSec));
    localStorage.setItem('timerMinStorage', String(timerOneMin));
    localStorage.setItem('timerHrStorage', String(timerOneHr));
  }

  return (
    <div className="Clock">
      <header className="Clock-header">
        <h2>Current Time:</h2>
        <h4>{time.date.toLocaleTimeString()} - {setTimezone()}</h4>
        <h2>Aligners are {timerSwitch ? 'out' : 'in'}:</h2>
        <h4>
          {timerOneHr} hr {timerOneMin} min {timerOneSec} sec
        </h4>
        <div className="button-wrapper">
          <button onClick={clickTimerBtn}>Timer Switch</button>
          <button onClick={resetTimer}>Reset Time</button>
        </div>
      </header>
    </div>
  );
}

export default Clock;
