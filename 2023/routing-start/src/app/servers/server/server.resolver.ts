import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Server, ServersService} from "../servers.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ServerResolver implements Resolve<any> {
  constructor(
    private serversService: ServersService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
