import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  standalone: true,
  imports: [ShoppingEditComponent, NgForOf]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();
  ingredients: Ingredient[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
  ) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.ingredients;
    this.shoppingListService.shoppingListChanged.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.ingredients = this.shoppingListService.ingredients;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  editShoppingListItem(index: number) {
    this.shoppingListService.editeShoppingListItem.next(index);
  }
}
