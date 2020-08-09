import React, { useState, useEffect } from "react";
import "./Clock.css";
import CallTimer from "../../functions/CallTimer";

function Clock() {
  // Initialize state variables
  const [time, setTime] = useState({ date: new Date() });
  const [timerSwitch, setTimerSwitch] = useState(true);
  const [timerOneHr, setTimerOneHr] = useState(0);
  const [timerOneMin, setTimerOneMin] = useState(0);
  const [timerOneSec, setTimerOneSec] = useState(0);
  const [timerTwoHr, setTimerTwoHr] = useState(0);
  const [timerTwoMin, setTimerTwoMin] = useState(0);
  const [timerTwoSec, setTimerTwoSec] = useState(0);

  // Changes which timer is currently running
  function clickTimerBtn() {
    setTimerSwitch(!timerSwitch);
  }

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
    } else {
      // Aligners are out, setTimerTwo functions are called
      CallTimer(
        setTimerTwoSec,
        setTimerTwoMin,
        setTimerTwoHr,
        timerTwoSec,
        timerTwoMin,
        timerTwoHr,
        time
      );
    }
    // Reset both aligner timers at midnight
    if (time.date.toLocaleTimeString() === "12:00:00 AM") {
      setTimerOneSec(0);
      setTimerOneMin(0);
      setTimerOneHr(0);
      setTimerTwoSec(0);
      setTimerTwoMin(0);
      setTimerTwoHr(0);
    }
  }, [time.date.toLocaleTimeString()]);

  setInterval(() => {
    setTime({
      date: new Date(),
    });
  }, 1000);

  return (
    <div className="Clock">
      <header className="Clock-header">
        <h4>Current Time:</h4>
        <h5>{time.date.toLocaleTimeString()}</h5>
        <h4>Aligners are in:</h4>
        <h5>
          {timerOneHr} hr {timerOneMin} min {timerOneSec} sec
        </h5>
        <h4>Aligners are out:</h4>
        <h5>
          {timerTwoHr} hr {timerTwoMin} min {timerTwoSec} sec
        </h5>
        <button onClick={clickTimerBtn}>Timer Switch</button>
      </header>
    </div>
  );
}

export default Clock;
