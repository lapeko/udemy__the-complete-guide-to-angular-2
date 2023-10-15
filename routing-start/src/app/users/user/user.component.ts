import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.params as {id: number, name: string};
  }

}
