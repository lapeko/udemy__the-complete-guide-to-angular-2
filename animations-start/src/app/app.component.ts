import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger("divState", [
      state("normal", style({
        transform: "translateX(0)",
        backgroundColor: "red",
      })),
      state("highlighted", style({
        transform: "translateX(100px)",
        backgroundColor: "blue",
      })),
      transition("normal <=> highlighted", [
        animate('400ms ease-out'),
      ])
    ]),
    trigger("wildState", [
      state("normal", style({
        transform: "translateX(0) scale(1)",
        backgroundColor: "red",
      })),
      state("highlighted", style({
        transform: "translateX(100px) scale(1)",
        backgroundColor: "blue",
      })),
      state("shrank", style({
        transform: "translateX(0) scale(.5)",
        backgroundColor: "green",
      })),
      transition("normal => highlighted", [animate('400ms ease-out')]),
      transition("highlighted => normal", [animate('800ms ease-out')]),
      transition("shrank <=> *", [animate('800ms ease-out')]),
    ]),
  ]
})
export class AppComponent {
  animationState = "normal";
  shrinkState = "normal";
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(item: string) {
    console.log('Not implemented');
  }

  animate() {
    this.shrinkState = this.animationState = this.animationState === 'normal' ? 'highlighted' : 'normal'
  }

  shrink() {
    this.shrinkState = "shrank";
  }
}
