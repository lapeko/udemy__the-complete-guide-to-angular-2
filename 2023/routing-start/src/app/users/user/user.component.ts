import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  private paramsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(data => this.user = data as {id: number, name: string});
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
