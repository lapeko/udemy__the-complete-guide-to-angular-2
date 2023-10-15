import {Component, OnDestroy, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  private paramsSubscription: Subscription;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => this.server = this.serversService.getServer(+params.id));
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
