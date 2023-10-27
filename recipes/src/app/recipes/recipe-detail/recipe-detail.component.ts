import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";

import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {DropdownDirective} from "../../shared/dropdown.directive";
import {AppState} from "../../../store";
import {addItems} from "../../../store/shopping-list/shopping-list.actions";

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        tap(({id}) => this._recipeIndex = id),
        switchMap(({id}) => this.recipesService.recipes$.pipe(
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
    this.recipesService.deleteRecipe(this._recipeIndex - 1);
    this.router.navigate(['/recipes']);
  }
}
