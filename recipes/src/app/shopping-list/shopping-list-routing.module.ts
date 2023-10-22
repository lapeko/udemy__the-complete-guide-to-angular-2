import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";

const routes: Route[] = [
  {path: "shopping-list", component: ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {
}
