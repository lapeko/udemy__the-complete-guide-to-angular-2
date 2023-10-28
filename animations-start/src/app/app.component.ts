import { Component } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

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
        backgroundColor: "red",
        transform: "translateX(0) scale(1)",
      })),
      state("highlighted", style({
        backgroundColor: "blue",
        transform: "translateX(100px) scale(1)",
      })),
      state("shrankNormal", style({
        backgroundColor: "yellow",
        transform: "translateX(0) scale(.5)",
      })),
      state("shrankHighlighted", style({
        backgroundColor: "purple",
        transform: "translateX(100px) scale(.5)",
      })),
      transition("normal <=> highlighted", animate(300)),
      transition("highlighted <=> normal", animate(800)),
      transition("shrankNormal <=> *", animate(800)),
      transition("shrankHighlighted <=> *", animate(800)),
    ]),
  ]
})
export class AppComponent {
  animationState: "normal" | "highlighted" = "normal";
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
    console.log(this.shrinkState);
  }

  shrink() {
    this.shrinkState = `shrank${this.animationState.charAt(0).toUpperCase() + this.animationState.slice(1)}`;
    console.log(this.shrinkState);
  }
}
