import {NgModule} from "@angular/core";
import {PreloadAllModules, Route, RouterModule} from "@angular/router";

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
  {path: "recipes", loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule)},
  {path: "shopping-list", loadChildren: () => import("./shopping-list/shopping-list.module").then(m => m.ShoppingListModule)},
  {path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)},
  {path: "not-found", component: NotFoundComponent},
  {path: "**", redirectTo: "/not-found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
