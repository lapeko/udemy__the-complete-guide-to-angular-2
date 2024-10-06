import {ShoppingListItem} from "./shopping-list-item.model";

export class Recipe {
  constructor(
    public name: string,
    public desc: string,
    public imagePath: string,
    public ingredients: ShoppingListItem[],
  ) {}
}
