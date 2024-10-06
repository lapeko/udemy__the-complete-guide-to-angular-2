import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, of, tap} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";

import {AppState} from "../../../store";
import {addItem, deleteItem, setActiveItemIndex, updateItem} from "../../../store/shopping-list/shopping-list.actions";
import {ShoppingListItem} from "../../shared/shopping-list-item.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ]
})
export class ShoppingEditComponent {
  public isEditMode$ = of(false);
  public form = this.fb.group({
    name: this.fb.control("", Validators.required),
    amount: this.fb.control<number>(null, [
      Validators.required,
      Validators.min(1),
    ])
  });

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {
    this.isEditMode$ = this.store.select(state => state.shoppingList).pipe(
      tap(state => {
        if (state.activeItemIndex === null) this.form.reset();
        else this.form.setValue(state.items[state.activeItemIndex]);
      }),
      map(state => state.activeItemIndex !== null)
    );

  }

  addShoppingItem() {
    this.store.dispatch(addItem({payload: this.form.value as ShoppingListItem}));
    this.form.reset();
  }

  updateShoppingItem() {
    this.store.dispatch(updateItem({payload: this.form.value as ShoppingListItem}));
    this.form.reset();
  }

  clearShoppingItem() {
    this.store.dispatch(setActiveItemIndex({payload: null}));
    this.form.reset();
  }

  deleteShoppingItem() {
    this.store.dispatch(deleteItem());
    this.form.reset();
  }
}
