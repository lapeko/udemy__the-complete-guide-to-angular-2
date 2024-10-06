import { NgFor } from '@angular/common';
import {Component, effect, signal} from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions: string[] = [];
  counter = signal(0);
  counters = signal<string[]>([]);

  constructor() {
    effect(() => this.counters.mutate(arr => arr.push(this.counter().toString())), {allowSignalWrites: true});
  }

  increment() {
    this.counter.update(oldValue => oldValue + 1);
    this.actions.push('INCREMENT');
  }

  decrement() {
    this.counter.update(oldValue => oldValue - 1);
    this.actions.push('DECREMENT');
  }

  private pushCounters(counter: number) {
    this.counters.mutate(arr => arr.push(counter.toString()));
  }
}
