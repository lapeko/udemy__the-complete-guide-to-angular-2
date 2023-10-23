import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  shoppingListChanged = new Subject<void>();
  editeShoppingListItem = new Subject<number>();

  private _ingredients: Ingredient[] = [];

  get ingredients () {
    return this._ingredients.slice();
  }

  addIngredients(...ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.shoppingListChanged.next();
  }

  updateIngredient(ingredient: Ingredient, index: number) {
    this._ingredients[index] = ingredient;
    this.shoppingListChanged.next();
  }

  deleteIngredient(index: number) {
    this._ingredients.splice(index, 1);
    this.shoppingListChanged.next();
  }
}
