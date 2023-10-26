import {createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducer";
import {AppState} from "../index";

const selectAuth = (state: AppState) => state.auth;

export const isAuthenticated = createSelector(selectAuth, (state: AuthState) => !!state.user);
