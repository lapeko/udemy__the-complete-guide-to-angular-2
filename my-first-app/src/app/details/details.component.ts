import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  secretPasswordShown = true;
  logs = [];
  onToggle() {
    this.secretPasswordShown = !this.secretPasswordShown;
    this.logs.push(Date.now());
  }
}
