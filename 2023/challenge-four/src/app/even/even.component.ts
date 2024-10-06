import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-even',
  template: `<p style="color: red">{{num}}</p>`,
})
export class EvenComponent {
  @Input() num = 0;
}
