import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {TodayComponent} from "./today/today.component";

const routes: Route[] = [
  {path: "", component: DashboardComponent, children: [
      {path: "today", component: TodayComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
