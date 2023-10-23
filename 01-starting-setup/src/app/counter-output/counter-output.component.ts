import { Component } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent {
  counter$ = of(0);

  constructor(private store: Store<{counter: number}>) {
    this.counter$ = store.select(state => state.counter)
  }
}
