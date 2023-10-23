import {createReducer, on} from "@ngrx/store";
import {decrease, increase} from "./counter.actions";

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increase, (state, {payload}) => state + payload),
  on(decrease, (state, {payload}) => state - payload),
);
