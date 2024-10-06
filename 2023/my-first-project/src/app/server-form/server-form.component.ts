import {Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild} from '@angular/core';
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

  constructor(private renderer: Renderer2) {
  }

  addServer(content: string, isBlueprint = false) {
    const name = this.nameRef.nativeElement.value;
    this.onAddServer.emit({name, content, type: isBlueprint ? "blueprint" : "server"})
    this.renderer.setProperty(this.nameRef.nativeElement, 'value', "");
    this.renderer.setProperty(this.contentRef.nativeElement, 'value', "");
  }
}
