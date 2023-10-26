import {createReducer, on} from "@ngrx/store";

import {User} from "../../app/auth/user";
import * as AuthActions from "./auth.actions";

export interface AuthState {
  isLoading: boolean;
  user: User | null;
  error: string;
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: "",
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.initialSignIn, state => ({...state, isLoading: true})),
  on(AuthActions.signIn, state => ({...state, isLoading: true, error: null})),
  on(AuthActions.signUp, state => ({...state, isLoading: true, error: null})),
  on(AuthActions.signOut, state => ({...state, isLoading: true, user: null})),
  on(AuthActions.authenticated, (state, {payload}) => ({...state, isLoading: false, user: payload})),
  on(AuthActions.authFailed, (state, {payload}) => ({...state, isLoading: false, error: payload})),
);
