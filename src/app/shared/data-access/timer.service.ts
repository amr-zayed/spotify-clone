import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timer?: NodeJS.Timeout;
  maxSeconds: number = 1;
  ms: number = 0;
  isTimerRunning = false;

  constructor() { }

  startTimer() {
    if (!this.isTimerRunning) {
      this.timer = setInterval(() => {
        if (this.ms==this.maxSeconds){
          this.pauseTimer();
        }else{
          this.ms+=100;
        }
      },100);
      this.isTimerRunning = true;
    }
  }

  pauseTimer() {
    if (this.isTimerRunning && this.timer) {
      clearInterval(this.timer);
      this.isTimerRunning = false;
    }
  }

  resumeTimer() {
    this.startTimer();
  }

}
