import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";

const routes: Route[] = [
  {path: "auth", component: AuthComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
