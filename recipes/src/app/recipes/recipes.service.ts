import {Recipe} from "../shared/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private _recipes$ = new BehaviorSubject([]);

  get recipes$(): Observable<Recipe[]> {
    return this._recipes$.asObservable();
  }

  addRecipe(newRecipe: Recipe) {
    this._recipes$.next([...this._recipes$.value, newRecipe]);
    return this._recipes$.value.length;
  }

  loadRecipes(recipes: Recipe[]) {
    this._recipes$.next(recipes);
  }

  deleteRecipe(index: number) {
    this._recipes$.next(this._recipes$.value.filter((_, idx) => index !== idx));
  }

  updateRecipe(updatedRecipe: Recipe, index: number) {
    const recipes = [...this._recipes$.value];
    recipes[index] = updatedRecipe;
    this._recipes$.next(recipes);
  }
}
