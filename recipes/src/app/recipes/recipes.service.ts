import {Recipe} from "../shared/recipe.model";
import {Ingredient} from "../shared/ingredient.model";

export class RecipesService {
  private _recipes = [new Recipe(
    "A test recipe",
    "This is simply a test",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQelhbOB93YxhEP2NtOfILtkyPlRqCwt5BhRzd4daMJRAJMouaE-iU0moyh8nZ2vl3bZaECsXPeZ6HybyZM2no",
    [new Ingredient('Meat', 2), new Ingredient("Buns", 1)]
  ), new Recipe(
    "A test recipe 2",
    "This is simply a test 2",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQelhbOB93YxhEP2NtOfILtkyPlRqCwt5BhRzd4daMJRAJMouaE-iU0moyh8nZ2vl3bZaECsXPeZ6HybyZM2no",
    [new Ingredient('Eggs', 3), new Ingredient("Beef", 1), new Ingredient("Bread", 1)]
  )];

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }
}
