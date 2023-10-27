import {createSelector} from "@ngrx/store";
import {AppState} from "../index";

const selectRecipes = (state: AppState) => state.recipes;

export const recipes = createSelector(selectRecipes, recipesState => recipesState.recipes);
