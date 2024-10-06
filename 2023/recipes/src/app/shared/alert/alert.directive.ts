import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: "[alert]",
  standalone: true,
})
export class AlertDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
