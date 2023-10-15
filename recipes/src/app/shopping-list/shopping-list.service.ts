import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  shoppingListChangedEmitter = new EventEmitter<void>();

  private _ingredients: Ingredient[] = [];

  get ingredients () {
    return this._ingredients.slice();
  }

  addIngredients(...ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.shoppingListChangedEmitter.emit();
  }
}
