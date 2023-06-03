import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
    `
      .online {
        color: white;
      }
    `,
  ],
})
export class ServerComponent {
  serverId = 10;
  status: string;

  constructor() {
    this.status = Math.random() < 0.5 ? 'offline' : 'online';
  }

  get serverStatusColor(): string {
    return this.status === 'online' ? 'green' : 'red';
  }
}
