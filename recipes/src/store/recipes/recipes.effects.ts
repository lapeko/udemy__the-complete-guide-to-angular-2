import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {RecipesService} from "../../app/services/recipes.service";
import {
  addRecipe, deleteRecipe,
  fetchRecipes,
  fetchRecipesFailure,
  fetchRecipesSuccess, updateRecipe,
  uploadRecipes,
  uploadRecipesFailure,
  uploadRecipesSuccess
} from "./recipes.actions";
import {AppState} from "../index";
import {recipes} from "./recipes.selectors";
import {Injectable} from "@angular/core";

@Injectable()
export class RecipesEffects {
  fetchRecipesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRecipes),
    switchMap(() => this.recipesService.fetchRecipes().pipe(
      map(recipes => fetchRecipesSuccess({payload: recipes})),
      catchError(error => of(fetchRecipesFailure({payload: error.message})))
    )),
  ));

  uploadRecipesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(uploadRecipes),
    withLatestFrom(this.store.select(recipes)),
    switchMap(([_, recipes]) => this.recipesService.storeRecipes(recipes).pipe(
      map(recipes => uploadRecipesSuccess()),
      catchError(error => of(uploadRecipesFailure({payload: error.message})))
    )),
  ));

  addRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(addRecipe),
    withLatestFrom(this.store.select(recipes)),
    tap(([_, recipes]) => this.router.navigate(["/recipes", recipes.length])),
  ), {dispatch: false});

  updateRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(updateRecipe),
    tap(() => this.router.navigate(["/recipes"])),
  ), {dispatch: false});

  deleteRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(deleteRecipe),
    tap(() => this.router.navigate(["/recipes"])),
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private recipesService: RecipesService,
    private router: Router,
    private store: Store<AppState>,
  ) {
  }
}
