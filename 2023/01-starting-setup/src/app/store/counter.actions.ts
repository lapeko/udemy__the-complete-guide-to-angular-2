import {createAction, props} from "@ngrx/store";

export const init = createAction("[Counter] init");
export const set = createAction("[Counter] set", props<{counter: number}>());
export const increase = createAction("[Counter] increase");
export const decrease = createAction("[Counter] decrease");
