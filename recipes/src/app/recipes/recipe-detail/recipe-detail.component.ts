import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";

import {Recipe} from "../../shared/recipe.model";
import {DropdownDirective} from "../../shared/dropdown.directive";
import {AppState} from "../../../store";
import {addItems} from "../../../store/shopping-list/shopping-list.actions";
import {recipes} from "../../../store/recipes/recipes.selectors";
import {deleteRecipe} from "../../../store/recipes/recipes.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: true,
  imports: [
    DropdownDirective,
    RouterLink,
    NgIf,
    NgForOf
  ]
})
export class RecipeDetailComponent implements OnInit, OnDestroy  {
  activeRecipe: Recipe;
  private _recipeIndex: number;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        tap(({id}) => this._recipeIndex = id),
        switchMap(({id}) => this.store.select(recipes).pipe(
          map(recipes => recipes[id - 1])
        ))
      ).subscribe(activeRecipe => this.activeRecipe = activeRecipe);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addIngredientsToShoppingList() {
    this.store.dispatch(addItems({payload: this.activeRecipe.ingredients}));
  }

  deleteRecipe() {
    this.store.dispatch(deleteRecipe({payload: this._recipeIndex - 1}));
  }
}
