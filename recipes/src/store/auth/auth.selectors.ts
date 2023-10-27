import {createSelector} from "@ngrx/store";
import {AppState} from "../index";

const selectAuth = (state: AppState) => state.auth;

export const isAuthenticated = createSelector(selectAuth, authState => !!authState.user);
