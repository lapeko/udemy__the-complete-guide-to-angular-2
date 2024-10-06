import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-odd',
  template: `<p style="color: blue">{{num}}</p>`,
})
export class OddComponent {
  @Input() num = 0;
}
