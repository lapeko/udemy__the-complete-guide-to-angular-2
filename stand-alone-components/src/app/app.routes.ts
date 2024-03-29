import {Route} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";

export const routes: Route[] = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: WelcomeComponent},
  {path: "dashboard", loadChildren: () => import("./dashboard/dashboard.routes").then(r => r.DASHBOARD_ROUTES)},
  {path: "about", loadComponent: () => import("./about/about.component").then(m => m.AboutComponent)},
]
