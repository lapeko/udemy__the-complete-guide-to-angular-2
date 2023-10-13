import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @Output() addShopItem = new EventEmitter<Ingredient>();
  @ViewChild('itemName') itemName: ElementRef;

  onAddShoppingItem(amount: number) {
    this.addShopItem.emit(new Ingredient(this.itemName.nativeElement.value, amount));
  }
}
