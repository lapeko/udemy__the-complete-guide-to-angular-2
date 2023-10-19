import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
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
