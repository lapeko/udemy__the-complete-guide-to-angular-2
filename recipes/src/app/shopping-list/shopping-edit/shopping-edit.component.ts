import {Component, ViewChild} from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @ViewChild('shoppingItemForm') shoppingItemForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  addShoppingItem() {
    this.shoppingListService
      .addIngredients(this.shoppingItemForm.value);
    this.shoppingItemForm.resetForm();
  }
}
