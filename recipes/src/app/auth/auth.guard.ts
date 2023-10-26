import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {map} from "rxjs";
import {Store} from "@ngrx/store";

import {AppState} from "../../store";

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select((state: AppState) => state.auth.user).pipe(map((user) => {
    if (user) return true;
    return router.createUrlTree(['auth']);
  }));
};
