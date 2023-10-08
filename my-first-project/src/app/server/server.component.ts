import {Component} from "@angular/core";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styles: [`
    .online {
      text-decoration: underline;
    }
  `]
})
export class ServerComponent {
  serverId = 10;
  serverStatus: "offline" | "online" = Math.random() < 0.5 ? "offline" : "online";

  getColor() {
    return this.serverStatus === "offline" ? "red" : "green";
  }
}
