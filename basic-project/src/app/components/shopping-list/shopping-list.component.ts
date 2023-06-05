import { Component } from '@angular/core';
import { Ingredient } from './ingredient/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Onion', 3),
    new Ingredient('Potato', 2),
  ];
}
