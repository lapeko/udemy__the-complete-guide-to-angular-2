import {authReducer, AuthState} from "./auth/auth.reducer";

import * as authEffects from "./auth/auth.effects";

export interface AppState {
  auth: AuthState;
}

export const reducers = {
  auth: authReducer,
  // ingredients: ingredientsReducer,
  // recipes: recipesReducer,
};

export const effects = [authEffects];
