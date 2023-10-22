import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";

import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AppComponent} from "./app.component";
import {AuthComponent} from "./auth/auth.component";
import {authGuard} from "./auth/auth.guard";

const routes: Route[] = [
  {path: "", redirectTo: "/recipes", pathMatch: "full"},
  {path: "shopping-list", component: ShoppingListComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "auth", component: AuthComponent},
  {path: "**", redirectTo: "/not-found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
