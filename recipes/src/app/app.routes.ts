import {Route} from "@angular/router";

import {NotFoundComponent} from "./not-found/not-found.component";

export const APP_ROUTES: Route[] = [
  {path: "", redirectTo: "/recipes", pathMatch: "full"},
  {path: "recipes", loadChildren: () => import("./recipes/recipes.routes").then(r => r.RECIPES_ROUTES)},
  {path: "shopping-list", loadChildren: () => import("./shopping-list/shopping-list.routes").then(r => r.SHOPPING_LIST_ROUTES)},
  {path: "auth", loadChildren: () => import("./auth/auth.routes").then(r => r.AUTH_ROUTES)},
  {path: "not-found", component: NotFoundComponent},
  {path: "**", redirectTo: "/not-found"}
];
