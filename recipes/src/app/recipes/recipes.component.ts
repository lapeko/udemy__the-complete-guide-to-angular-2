import { Component } from '@angular/core';
import {Recipe} from "./recipe-list/recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  activeRecipe?: Recipe = null;

  onRecipeClick(recipe: Recipe) {
    this.activeRecipe = recipe;
  }
}
