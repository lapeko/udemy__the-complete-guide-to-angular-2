import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {authGuard} from "../auth/auth.guard";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";

const routes: Route[] = [{
  path: "recipes", canActivate: [authGuard], component: RecipesComponent, children: [
    {path: "", component: RecipeStartComponent},
    {path: "new", component: RecipeEditComponent},
    {path: ":id", component: RecipeDetailComponent},
    {path: ":id/edit", component: RecipeEditComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {
}
