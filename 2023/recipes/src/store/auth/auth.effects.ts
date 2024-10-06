import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, EMPTY, map, of, Subject, switchMap, takeUntil, timer} from "rxjs";

import {LocalStorageKey} from "../../app/shared/types";
import {DeserializedUser, User} from "../../app/auth/user";
import {authFailed, authenticated, initialSignIn, signUp, signIn, signOut} from "./auth.actions";
import {AuthService} from "../../app/services/auth.service";
import {Router} from "@angular/router";

const API_KEY = "AIzaSyD90uAwOVJ2rM1J34bBf8Cb-meL-oakDwc";
const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

const stopTimer$ = new Subject<void>();

export const initialSignInEffect = createEffect((actions$ = inject(Actions)) => actions$.pipe(
  ofType(initialSignIn),
  switchMap(() => {
    const userData = localStorage.getItem(LocalStorageKey.AuthUserData);
    if (!userData)
      return of(authenticated(null));


    const {id, email, _token, _tokenExpirationDate}: DeserializedUser = JSON.parse(userData);
    const user = new User(id, email, _token, new Date(_tokenExpirationDate));

    if (!user.expiresIn)
      return of(authenticated(null));

    return of(authenticated({payload: user}));
  }),
  catchError(error => of(authFailed(error.message))),
), {functional: true});

export const signInEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
) => actions$.pipe(
  ofType(signIn),
  switchMap(({payload: {email, password}}) => authService.signIn(email, password)
    .pipe(
      map(user => {
        localStorage.setItem(LocalStorageKey.AuthUserData, JSON.stringify(user));
        return authenticated({payload: user});
      }),
      catchError((errorMessage: string) => of(authFailed({payload: errorMessage}))),
    )
  ),
), {functional: true});

export const signUpEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
) => actions$.pipe(
  ofType(signUp),
  switchMap(({payload: {email, password}}) => authService.signUp(email, password)
    .pipe(
      map(user => {
        localStorage.setItem(LocalStorageKey.AuthUserData, JSON.stringify(user));
        return authenticated({payload: user});
      }),
      catchError((errorMessage) => of(authFailed({payload: errorMessage})))
    )
  ),
), {functional: true});

export const signOutEffect = createEffect((
  actions$ = inject(Actions),
) => actions$.pipe(
  ofType(signOut),
  switchMap(() => of(authenticated({payload: null}))),
), {functional: true});

export const authenticatedEffect = createEffect((
  actions$ = inject(Actions),
  router = inject(Router),
) => actions$.pipe(
  ofType(authenticated),
  switchMap(({payload: user}) => {
    router.navigate([user ? "/recipes" : "/auth"]);

    if (user) {
      stopTimer$.next();

      return timer(user.expiresIn).pipe(
        takeUntil(stopTimer$),
        map(() => signOut()),
      )
    }

    localStorage.removeItem(LocalStorageKey.AuthUserData);
    stopTimer$.next();
    return EMPTY;
  }),
), {functional: true});
