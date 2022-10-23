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
  function clickTimerBtn() {
    setTimerSwitch(!timerSwitch);
  }

  function resetTimer() {
    window.localStorage.clear();
    setTimerOneHr(0);
    setTimerOneMin(0);
    setTimerOneSec(0);
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

  setInterval(() => {
    setTime({
      date: new Date(),
    });
  }, 1000);

  window.onbeforeunload = (e) => {
    localStorage.setItem('timerSecStorage', String(timerOneSec));
    localStorage.setItem('timerMinStorage', String(timerOneMin));
    localStorage.setItem('timerHrStorage', String(timerOneHr));
  }

  return (
    <div className="Clock">
      <header className="Clock-header">
        <h4>Current Time:</h4>
        <h5>{time.date.toLocaleTimeString()}</h5>
        <h4>Aligners are {timerSwitch ? 'out' : 'in'}:</h4>
        <h5>
          {timerOneHr} hr {timerOneMin} min {timerOneSec} sec
        </h5>
        <button onClick={clickTimerBtn}>Timer Switch</button>
        <button onClick={resetTimer}>Reset Time</button>
      </header>
    </div>
  );
}

export default Clock;
