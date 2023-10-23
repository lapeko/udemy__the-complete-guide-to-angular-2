import {inject} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {decrease, increase} from "./counter.actions";
import {tap} from "rxjs";

export const logCounterIncrease = createEffect((actions$ = inject(Actions)) => actions$.pipe(
  ofType(increase),
  tap(action => console.log('Counter increased. Action log: ', action)),
), {functional: true, dispatch: false});

export const logCounterDecrease = createEffect((actions$ = inject(Actions)) => actions$.pipe(
  ofType(decrease),
  tap(action => console.log('Counter decreased. Action log: ', action)),
), {functional: true, dispatch: false});
