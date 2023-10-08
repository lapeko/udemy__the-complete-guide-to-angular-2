import { Component } from '@angular/core';
import {Server} from "./common/server.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers: Server[] = [];

  addServer(server: Server) {
    this.servers.push(server);
  }
}
