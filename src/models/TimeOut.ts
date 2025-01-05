class TimeOut {
  handler: TimerHandler;
  id: number;

  constructor(handler: TimerHandler, time: number) {
    this.handler = handler;
    this.id = setTimeout(handler, time);
  }

  clear() {
    clearTimeout(this.id);
  }
}

export default TimeOut;
