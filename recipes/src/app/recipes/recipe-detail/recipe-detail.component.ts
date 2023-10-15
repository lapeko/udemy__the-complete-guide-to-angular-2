import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../recipes.service";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit{
  activeRecipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private slService: ShoppingListService,
  ) {
  }

  ngOnInit() {
    this.recipesService.activeRecipeEmitter
      .subscribe(recipe => this.activeRecipe = recipe);
  }

  addIngredientsToShoppingList() {
      this.slService.addIngredients(...this.activeRecipe.ingredients);
  }
}
