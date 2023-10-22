import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {DropdownDirective} from "./dropdown.directive";
import {SpinnerComponent} from "./spinner/spinner.component";
import {AlertComponent} from "./alert/alert.component";
import {AlertDirective} from "./alert/alert.directive";

@NgModule({
  declarations: [
    AlertComponent,
    AlertDirective,
    DropdownDirective,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    AlertDirective,
    DropdownDirective,
    SpinnerComponent,
    CommonModule,
  ]
})
export class SharedModule {
}
