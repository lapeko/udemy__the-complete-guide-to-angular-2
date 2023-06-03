import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  serverName = '';
  newServerAllowed = false;
  serverCreationStatus = 'No server was created';

  constructor() {
    setTimeout(() => (this.newServerAllowed = true), 2000);
  }

  onServerCreated() {
    this.serverCreationStatus = 'New server was created';
  }

  onInput(event: Event) {
    this.serverName = (event.target as HTMLInputElement).value;
  }
}
