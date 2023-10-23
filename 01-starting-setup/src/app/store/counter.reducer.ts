import {createReducer, on} from "@ngrx/store";
import {decrease, increase, init, set} from "./counter.actions";

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(set, (_, {counter}) => counter),
  on(increase, (state) => state + 1),
  on(decrease, (state) => state - 1),
);
