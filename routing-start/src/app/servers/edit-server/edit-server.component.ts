import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { Subscription } from "rxjs";

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from "../../can-deactivate.guard";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  editBtnDisabled = true;
  changesSaved = false;
  private subscriptions = new Subscription();

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    let subscription = this.activatedRoute.params
      .subscribe(params => this.server = this.serversService.getServer(+params["id"]));
    this.subscriptions.add(subscription);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    subscription = this.activatedRoute.queryParams
      .subscribe(qParams => this.editBtnDisabled = qParams['allowEdit'] !== 'true');
    this.subscriptions.add(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(["../"], {relativeTo: this.activatedRoute});
  }

  canDeactivate() {
    if (this.server.name !== this.serverName || this.server.status !== this.serverStatus)
      return window.confirm();
    return true;
  }

}
