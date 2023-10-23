import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {map, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";

import {Recipe} from "../../shared/recipe.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {RecipesService} from "../../services/recipes.service";
import {DropdownDirective} from "../../shared/dropdown.directive";

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
    private slService: ShoppingListService,
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
    this.slService.addIngredients(...this.activeRecipe.ingredients);
  }

  deleteRecipe() {
    this.recipesService.deleteRecipe(this._recipeIndex - 1);
    this.router.navigate(['/recipes']);
  }
}
