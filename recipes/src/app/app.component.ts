import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";

import {HeaderComponent} from "./header/header.component";
import {initialSignIn} from "../store/auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ]
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {
  }
  ngOnInit() {
    this.store.dispatch(initialSignIn());
  }
}
