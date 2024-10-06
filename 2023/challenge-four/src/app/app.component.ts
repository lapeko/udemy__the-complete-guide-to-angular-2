import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-game-control (counterIncrease)="onCounterIncrease($event)"></app-game-control>
    <ng-container *ngFor="let num of numbers">
      <app-odd *ngIf="num % 2; else even" [num]="num"></app-odd>
      <ng-template #even>
        <app-even [num]="num"></app-even>
      </ng-template>
    </ng-container>
  `,
})
export class AppComponent {
  numbers: number[] = [];

  onCounterIncrease(num: number) {
    this.numbers.push(num)
  }
}
