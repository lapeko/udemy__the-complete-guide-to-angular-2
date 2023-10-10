import {Component, EventEmitter, Output} from '@angular/core';
import {PageName} from "../shared/types";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() navigate = new EventEmitter<PageName>();

  onNavigationClick(pageName: PageName) {
    this.navigate.emit(pageName);
  }
}
