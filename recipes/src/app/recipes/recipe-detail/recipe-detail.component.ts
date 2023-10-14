import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe-list/recipe.model";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  activeRecipe: Recipe;

  constructor(private recipesService: RecipesService) {
    this.recipesService.activeRecipeEmitter.subscribe(recipe => this.activeRecipe = recipe);
  }
}
