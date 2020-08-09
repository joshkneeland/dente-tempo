function CallTimer(
  setTimerSec: Function,
  setTimerMin: Function,
  setTimerHr: Function,
  timerSec: number,
  timerMin: number,
  timerHr: number,
  time: any
) {
  switch (true) {
    case timerSec === 59:
      setTimerMin(timerMin + 1);
      setTimerSec(0);
      break;
    case timerMin === 59:
      setTimerHr(timerHr + 1);
      setTimerMin(0);
      break;
    case timerHr === 23:
      setTimerHr(0);
      break;
    default:
      setTimerSec(timerSec + 1);
      break;
  }
}

export default CallTimer;
