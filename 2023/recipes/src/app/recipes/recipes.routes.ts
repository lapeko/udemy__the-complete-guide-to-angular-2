import {Route} from "@angular/router";

import {authGuard} from "../auth/auth.guard";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";

export const RECIPES_ROUTES: Route[] = [{
  path: "", canActivate: [authGuard], component: RecipesComponent, children: [
    {path: "", component: RecipeStartComponent},
    {path: "new", component: RecipeEditComponent},
    {path: ":id", component: RecipeDetailComponent},
    {path: ":id/edit", component: RecipeEditComponent},
  ],
}];
