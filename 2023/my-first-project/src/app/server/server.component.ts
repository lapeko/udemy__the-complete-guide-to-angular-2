import {Component, Input} from "@angular/core";
import {Server} from "../common/server.model";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent {
  @Input() server: Server;
}
