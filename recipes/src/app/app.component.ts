import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {HeaderComponent} from "./header/header.component";
import {RouterOutlet} from "@angular/router";

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
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.authService.autoSignIn();
  }
}
