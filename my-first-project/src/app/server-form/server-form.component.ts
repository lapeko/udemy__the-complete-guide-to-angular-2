import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Server} from "../common/server.model";

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent {
  @Output() onAddServer = new EventEmitter<Server>();
  @ViewChild('name') nameRef: ElementRef;
  @ViewChild('content') contentRef: ElementRef;

  addServer(content: string, isBlueprint = false) {
    const name = this.nameRef.nativeElement.value;
    this.onAddServer.emit({name, content, type: isBlueprint ? "blueprint" : "server"})
    this.nameRef.nativeElement.value = "";
    this.contentRef.nativeElement.value = "";
  }
}
