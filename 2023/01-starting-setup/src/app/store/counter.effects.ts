import {inject} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {decrease, increase, init, set} from "./counter.actions";
import {map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {selectCounter} from "./counter.selectors";

export const counterChanged = createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
) => actions$.pipe(
  ofType(increase, decrease),
  withLatestFrom(store.select(selectCounter)),
  tap(([action, counter]) => {
    console.log('Counter changed. Action log: ', action, 'Counter: ', counter);
    localStorage.setItem("counter", counter.toString());
  }),
), {functional: true, dispatch: false});

export const counterInitialized = createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
) => actions$.pipe(
  ofType(init),
  map(() => Number(localStorage.getItem("counter") || "0")),
  switchMap(counter => of(set({counter}))),
), {functional: true});
