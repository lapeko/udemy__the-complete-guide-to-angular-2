import {authReducer} from "./auth/auth.reducer";
import {shoppingListReducer} from "./shopping-list/shopping-list.reducer";
import {recipesReducer} from "./recipes/recipes.reducer";
import {RecipesEffects} from "./recipes/recipes.effects";
import * as authEffects from "./auth/auth.effects";

export interface AppState {
  auth: ReturnType<typeof authReducer>;
  shoppingList: ReturnType<typeof shoppingListReducer>;
  recipes: ReturnType<typeof recipesReducer>,
}

export const reducers = {
  auth: authReducer,
  shoppingList: shoppingListReducer,
  recipes: recipesReducer,
};

export const effects = [
  authEffects,
  RecipesEffects,
];
