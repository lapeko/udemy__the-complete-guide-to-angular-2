import {Component, OnDestroy, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Router} from "@angular/router";
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => this.server = this.serversService.getServer(+params.id));
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  editServer() {
    this.router.navigate(['edit'],{relativeTo: this.activatedRoute, queryParamsHandling: "preserve"});
  }
}
