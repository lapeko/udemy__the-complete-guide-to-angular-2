import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  visitServers() {
    this.router.navigate(["servers"]);
  }

  visitServer(id: number) {
    this.router
      .navigate(["servers", id, "edit"], {queryParams: {allowEdit: true}, fragment: "some-fragment"});
  }
}