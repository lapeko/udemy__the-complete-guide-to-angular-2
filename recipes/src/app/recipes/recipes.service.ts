import {Recipe} from "./recipe-list/recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipesService {
  public activeRecipeEmitter = new EventEmitter<Recipe>();
  private _recipes = [new Recipe(
    "A test recipe",
    "This is simply a test",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQelhbOB93YxhEP2NtOfILtkyPlRqCwt5BhRzd4daMJRAJMouaE-iU0moyh8nZ2vl3bZaECsXPeZ6HybyZM2no"
  ), new Recipe(
    "A test recipe 2",
    "This is simply a test 2",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQelhbOB93YxhEP2NtOfILtkyPlRqCwt5BhRzd4daMJRAJMouaE-iU0moyh8nZ2vl3bZaECsXPeZ6HybyZM2no"
  )];

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }
}
