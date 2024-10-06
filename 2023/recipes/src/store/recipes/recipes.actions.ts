import {createAction, props} from "@ngrx/store";
import {Recipe} from "../../app/shared/recipe.model";

export const fetchRecipes = createAction("[RECIPES] fetchRecipes");
export const uploadRecipes = createAction("[RECIPES] uploadRecipes");
export const addRecipe = createAction("[RECIPES] addRecipe", props<{payload: Recipe}>());
export const updateRecipe = createAction("[RECIPES] updateRecipe", props<{payload: { index: number, recipe: Recipe }}>());
export const deleteRecipe = createAction("[RECIPES] deleteRecipe", props<{payload: number}>());
export const fetchRecipesSuccess = createAction("[RECIPES] fetchRecipesSuccess", props<{payload: Recipe[]}>());
export const fetchRecipesFailure = createAction("[RECIPES] fetchRecipesFailure", props<{payload: string}>());
export const uploadRecipesSuccess = createAction("[RECIPES] uploadRecipesSuccess");
export const uploadRecipesFailure = createAction("[RECIPES] uploadRecipesFailure", props<{payload: string}>());
