import {createAction, props} from "@ngrx/store";

export const increase = createAction("[Counter] increase", props<{ payload: number }>());
