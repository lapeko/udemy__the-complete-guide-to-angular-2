import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from "../../services/shopping-list.service";
import {FormsModule, NgForm} from "@angular/forms";
import {map, Subject, takeUntil, tap} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingItemForm') shoppingItemForm: NgForm;
  public idEditMode = false;
  private editedIndex = 0;
  _destroyed$ = new Subject<void>();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.shoppingListService.editeShoppingListItem
      .pipe(
        takeUntil(this._destroyed$),
        tap((index) => {
          this.idEditMode = true;
          this.editedIndex = index;
        }),
        map(index => this.shoppingListService.ingredients[index]),
      )
      .subscribe(ingredient => this.shoppingItemForm.setValue(ingredient));
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  addShoppingItem() {
    this.shoppingListService
      .addIngredients(this.shoppingItemForm.value);
    this.shoppingItemForm.resetForm();
  }

  updateShoppingItem() {
    this.shoppingListService
      .updateIngredient(this.shoppingItemForm.value, this.editedIndex);
    this.idEditMode = false;
    this.shoppingItemForm.resetForm();
  }

  clearShoppingItem() {
    this.idEditMode = false;
    this.shoppingItemForm.resetForm();
  }

  deleteShoppingItem() {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.idEditMode = false;
    this.shoppingItemForm.resetForm();
  }
}
