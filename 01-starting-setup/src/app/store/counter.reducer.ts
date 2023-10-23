import {createReducer, on} from "@ngrx/store";
import {increase} from "./counter.actions";

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increase, (state, {payload = 1}) => state + payload),
);
