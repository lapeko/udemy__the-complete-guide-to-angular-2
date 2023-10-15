import {Route} from "@angular/router"

import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {ServersComponent} from "./servers/servers.component";

export const appRoutes: Route[] = [
  {path: "", component: HomeComponent},
  {path: "users", component: UsersComponent},
  {path: "servers", component: ServersComponent},
];
