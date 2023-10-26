import {bootstrapApplication} from "@angular/platform-browser";
import { provideStore } from '@ngrx/store';
import {provideRouter} from "@angular/router";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideEffects} from "@ngrx/effects";

import {AppComponent} from "./app/app.component";
import {APP_ROUTES} from "./app/app.routes";
import {AuthInterceptor} from "./app/auth/auth.interceptor";
import {effects, reducers} from "./store";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideStore(reducers),
    provideEffects(effects),
]
})
  .catch(err => console.error(err));
