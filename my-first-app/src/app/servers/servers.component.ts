import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  newServerAllowed = false;
  serverCreationStatus = 'No server was created';

  constructor() {
    setTimeout(() => (this.newServerAllowed = true), 2000);
  }

  onServerCreated() {
    this.serverCreationStatus = 'New server was created';
  }
}
