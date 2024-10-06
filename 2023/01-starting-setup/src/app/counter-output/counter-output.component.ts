import { Component } from '@angular/core';
import {of} from 'rxjs';
import {Store} from "@ngrx/store";
import {selectCounter, selectDoubleCounter} from "../store/counter.selectors";

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent {
  counter$ = of(0);
  doubleCounter$ = of(0);

  constructor(private store: Store<{counter: number}>) {
    this.counter$ = store.select(selectCounter);
    this.doubleCounter$ = store.select(selectDoubleCounter);
  }
}
