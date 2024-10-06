import {Component, OnDestroy, OnInit} from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const subscription = this.activatedRoute.data
      .subscribe(data => this.server = data.server);
    this.subscription.add(subscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editServer() {
    this.router.navigate(['edit'],{relativeTo: this.activatedRoute, queryParamsHandling: "preserve"});
  }
}
