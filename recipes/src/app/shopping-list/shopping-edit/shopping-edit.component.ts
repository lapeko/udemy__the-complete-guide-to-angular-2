import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @ViewChild('itemName') itemName: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }

  onAddShoppingItem(amount: number) {
    this.shoppingListService
      .addIngredients(new Ingredient(this.itemName.nativeElement.value, amount));
  }
}
