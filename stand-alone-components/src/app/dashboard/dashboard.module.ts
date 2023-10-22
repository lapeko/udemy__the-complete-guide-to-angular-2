import {NgModule} from "@angular/core";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {TodayComponent} from "./today/today.component";

@NgModule({
  declarations: [
    DashboardComponent,
    TodayComponent
  ],
  imports: [
    DashboardRoutingModule,
  ],
})
export class DashboardModule {
}
