import { Component } from '@angular/core';
import {PageName} from "./shared/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activePage: PageName = "recipes";

  onNavigate(pageName: PageName) {
    this.activePage = pageName;
    console.log(this.activePage);
  }
}
