import {authReducer, AuthState} from "./auth/auth.reducer";

import * as authEffects from "./auth/auth.effects";
import {shoppingListReducer, ShoppingListState} from "./shopping-list/shopping-list.reducer";

export interface AppState {
  auth: AuthState;
  shoppingList: ShoppingListState
}

export const reducers = {
  auth: authReducer,
  shoppingList: shoppingListReducer,
  // recipes: recipesReducer,
};

export const effects = [authEffects];
