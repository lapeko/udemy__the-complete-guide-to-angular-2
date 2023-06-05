import { Component } from '@angular/core';
import { ServerElement } from './server-element/server-element.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements = [new ServerElement('Server 1', 'server', 'Test content')];

  onAddServer(newServer: ServerElement) {
    this.serverElements.push(newServer);
  }
}
