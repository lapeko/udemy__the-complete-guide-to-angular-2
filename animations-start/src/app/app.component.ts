import {Component, OnInit} from '@angular/core';
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
    trigger("list", [
      transition('* => void', [
        animate(200, style({
          opacity: 0,
          transform: "translate(-100px)"
        }))
      ]),
      transition((fromState, toState, element, params) => {
          return fromState === "void" && params?.["initialized"];
        },
        [
          style({
            opacity: 0,
            transform: "translate(-100px)"
          }),
          animate(200)
        ],
      ),
    ])
  ]
})
export class AppComponent {
  animationState: "normal" | "highlighted" = "normal";
  shrinkState = "normal";
  list = ['Milk', 'Sugar', 'Bread'];
  initialized = false;

  onAdd(item: string) {
    this.list.push(item);
  }

  ngOnInit() {
    setTimeout(() => this.initialized = true);
  }

  onDelete(itemDelete: string) {
    this.list = this.list.filter(item => item !== itemDelete);
  }

  animate() {
    this.shrinkState = this.animationState = this.animationState === 'normal' ? 'highlighted' : 'normal'
  }

  shrink() {
    this.shrinkState = `shrank${this.animationState.charAt(0).toUpperCase() + this.animationState.slice(1)}`;
  }
}
