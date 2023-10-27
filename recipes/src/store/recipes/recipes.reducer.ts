import {createReducer, on} from "@ngrx/store";

import {Recipe} from "../../app/shared/recipe.model";
import * as recipesActions from "./recipes.actions";

interface RecipesState {
  recipes: Recipe[];
  isLoading: boolean;
  loadingError: string;
  isUploading: boolean,
  uploadingError: string,
}

const initialState = {
  recipes: [],
  isLoading: false,
  loadingError: "",
  isUploading: false,
  uploadingError: "",
};

export const recipesReducer = createReducer<RecipesState>(
  initialState,
  on(recipesActions.fetchRecipes, state => ({...state, isLoading: true, loadingError: ""})),
  on(recipesActions.uploadRecipes, state => ({...state, isUploading: true, uploadingError: ""})),
  on(recipesActions.addRecipe, (state, {payload}) => ({...state, recipes: [...state.recipes, payload]})),
  on(recipesActions.updateRecipe, (state, {payload}) => {
    const recipes = [...state.recipes];
    recipes[payload.index] = payload.recipe;
    return {...state, recipes}
  }),
  on(recipesActions.deleteRecipe, (state, {payload}) => ({
    ...state,
    recipes: state.recipes.filter((_, index) => index !== payload)
  })),
  on(recipesActions.fetchRecipesSuccess, (state, {payload}) => ({
    ...state,
    isLoading: false,
    recipes: payload,
  })),
  on(recipesActions.fetchRecipesFailure, (state, {payload}) => ({
    ...state,
    isLoading: false,
    loadingError: payload,
  })),
  on(recipesActions.uploadRecipesSuccess, (state) => ({...state, isUploading: false})),
  on(recipesActions.uploadRecipesFailure, (state, {payload}) => ({
    ...state,
    isUploading: false,
    uploadingError: payload,
  })),
);
