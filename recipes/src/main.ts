import {bootstrapApplication} from "@angular/platform-browser";
import {provideStore} from '@ngrx/store';
import {provideRouter} from "@angular/router";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideEffects} from "@ngrx/effects";

import {AppComponent} from "./app/app.component";
import {APP_ROUTES} from "./app/app.routes";
import {AuthInterceptor} from "./app/auth/auth.interceptor";
import {reducers, effects} from "./store";
import {isDevMode} from "@angular/core";
import {provideStoreDevtools} from "@ngrx/store-devtools";

isDevMode()

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideStore(reducers),
    provideStoreDevtools(),
    provideEffects(effects),
]
})
  .catch(err => console.error(err));
