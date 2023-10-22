import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: "[alert]"
})
export class AlertDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
