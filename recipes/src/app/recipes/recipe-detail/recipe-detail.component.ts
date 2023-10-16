import {Component, OnInit, OnDestroy} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy  {
  activeRecipe: Recipe;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesServices: RecipesService,
    private slService: ShoppingListService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(({id}) =>  this.activeRecipe = this.recipesServices.recipes[+id  - 1]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addIngredientsToShoppingList() {
    this.slService.addIngredients(...this.activeRecipe.ingredients);
  }
}
