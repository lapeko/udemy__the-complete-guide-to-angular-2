import {Component} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {Store} from "@ngrx/store";

import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {AppState} from "../../store";
import {setActiveItemIndex} from "../../store/shopping-list/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  standalone: true,
  imports: [ShoppingEditComponent, NgForOf, AsyncPipe]
})
export class ShoppingListComponent {
  shoppingListItems$ = this.store.select(state => state.shoppingList.items);

  constructor(private store: Store<AppState>) {
  }

  editShoppingListItem(index: number) {
    this.store.dispatch(setActiveItemIndex({payload: index}));
  }
}
