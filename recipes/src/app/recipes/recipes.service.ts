import {Recipe} from "../shared/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private _recipes$ = new BehaviorSubject([new Recipe(
    "A test recipe",
    "This is simply a test",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQelhbOB93YxhEP2NtOfILtkyPlRqCwt5BhRzd4daMJRAJMouaE-iU0moyh8nZ2vl3bZaECsXPeZ6HybyZM2no",
    [new Ingredient('Meat', 2), new Ingredient("Buns", 1)]
  ), new Recipe(
    "A test recipe 2",
    "This is simply a test 2",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQelhbOB93YxhEP2NtOfILtkyPlRqCwt5BhRzd4daMJRAJMouaE-iU0moyh8nZ2vl3bZaECsXPeZ6HybyZM2no",
    [new Ingredient('Eggs', 3), new Ingredient("Beef", 1), new Ingredient("Bread", 1)]
  )]);

  get recipes$(): Observable<Recipe[]> {
    return this._recipes$.asObservable();
  }

  addRecipe(newRecipe: Recipe) {
    this._recipes$.next([...this._recipes$.value, newRecipe]);
    return this._recipes$.value.length;
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
