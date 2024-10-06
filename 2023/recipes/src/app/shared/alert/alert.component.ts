import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  closeComponent() {
    this.close.emit();
  }
}
