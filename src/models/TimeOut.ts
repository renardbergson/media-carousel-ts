class TimeOut {
  handler: TimerHandler;
  id: number;
  startTime: number;
  timeLeft;

  constructor(handler: TimerHandler, time: number) {
    this.handler = handler;
    this.id = setTimeout(handler, time);
    this.startTime = Date.now();
    this.timeLeft = time;
  }

  clear() {
    clearTimeout(this.id);
  }

  pause() {
    const passedTime = Date.now() - this.startTime;
    this.timeLeft = this.timeLeft - passedTime;
    this.clear();
  }

  continue() {
    this.clear();
    this.id = setTimeout(this.handler, this.timeLeft);
    this.startTime = Date.now();
  }
}

export default TimeOut;
