import {inject} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {decrease, increase} from "./counter.actions";
import {tap, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {selectCounter} from "./counter.selectors";

export const logCounterIncrease = createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
) => actions$.pipe(
  ofType(increase),
  withLatestFrom(store.select(selectCounter)),
  tap(([action, counter]) => console.log('Counter increased. Action log: ', action, 'Counter: ', counter)),
), {functional: true, dispatch: false});

export const logCounterDecrease = createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
) => actions$.pipe(
  ofType(decrease),
  withLatestFrom(store.select(selectCounter)),
  tap(([action, counter]) => console.log('Counter decreased. Action log: ', action, 'Counter: ', counter)),
), {functional: true, dispatch: false});
