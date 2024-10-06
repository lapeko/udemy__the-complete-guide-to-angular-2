import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  template: `
    <button (click)="startGame()">Start</button>
    <button (click)="stopGame()">Stop</button>
  `,
})
export class GameControlComponent {
  @Output() counterIncrease = new EventEmitter<number>();
  private counter = 0;
  private interval?: number;

  startGame() {
    if (this.interval) return;
    this.interval = setInterval(() => this.counterIncrease.emit(++this.counter), 1000);
  }

  stopGame() {
    this.interval && clearInterval(this.interval);
    this.interval = undefined;
  }
}
