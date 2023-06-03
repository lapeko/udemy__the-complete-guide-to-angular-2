import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  userName = '';
  serverName = '';
  newServerAllowed = false;
  serverCreated = false;
  // serverCreationStatus = 'No server was created';
  serverNames = ['server', 'server 2'];

  constructor() {
    setTimeout(() => (this.newServerAllowed = true), 2000);
  }

  createServer() {
    this.serverCreated = true;
    this.serverNames.push(this.serverName);
    // this.serverCreationStatus = `New server was created: ${this.serverName}`;
  }
}
