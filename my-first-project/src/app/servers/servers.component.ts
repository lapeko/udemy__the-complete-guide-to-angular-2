import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  servers: string[] = [];
  serverAllowed = false;
  serverCreationStatus = "No server was created!";
  serverName = "";
  serverCreated = false;

  constructor() {
    setTimeout(() => this.serverAllowed = true, 2000);
  }

  onServerCreate() {
    this.servers.push(this.serverName);
    this.serverCreated = true;
    this.serverCreationStatus = `Server with name "${this.serverName}" was created!`;
    this.serverName = "";
  }
}
