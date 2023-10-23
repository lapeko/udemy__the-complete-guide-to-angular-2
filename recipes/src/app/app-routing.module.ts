import {NgModule} from "@angular/core";
import {PreloadAllModules, Route, RouterModule} from "@angular/router";

import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Route[] = [
  {path: "", redirectTo: "/recipes", pathMatch: "full"},
  {path: "recipes", loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule)},
  {path: "shopping-list", loadChildren: () => import("./shopping-list/shopping-list.module").then(m => m.ShoppingListModule)},
  {path: "auth", loadChildren: () => import("./auth/auth.routes").then(r => r.AUTH_ROUTES)},
  {path: "not-found", component: NotFoundComponent},
  {path: "**", redirectTo: "/not-found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
