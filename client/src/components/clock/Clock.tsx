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

  // const [timerTwoHr, setTimerTwoHr] = useState(0);
  // const [timerTwoMin, setTimerTwoMin] = useState(0);
  // const [timerTwoSec, setTimerTwoSec] = useState(0);

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
    console.log('timerOneHr: ', timerOneHr);
    console.log('timerOneMin: ', timerOneMin);
    console.log('timerOneSec: ', timerOneSec);

    return () => {
      console.log("cleaned up");
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
    // else {
    //   // Aligners are out, setTimerTwo functions are called
    //   CallTimer(
    //     setTimerTwoSec,
    //     setTimerTwoMin,
    //     setTimerTwoHr,
    //     timerTwoSec,
    //     timerTwoMin,
    //     timerTwoHr,
    //     time
    //   );
    // }
  }, [time.date.toLocaleTimeString()]);

  setInterval(() => {
    setTime({
      date: new Date(),
    });
  }, 1000);

  window.onbeforeunload = (e) => {
    console.log('onbeforeunload was hit');
    // localStorage.clear();
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
        {/* <h4>Aligners are out:</h4>
        <h5>
          {timerTwoHr} hr {timerTwoMin} min {timerTwoSec} sec
        </h5> */}
        <button onClick={clickTimerBtn}>Timer Switch</button>
        <button onClick={resetTimer}>Reset Time</button>
      </header>
    </div>
  );
}

export default Clock;
