import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeClick = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.recipes = this.recipesService.recipes;
  }

  onRecipeClick(recipe: Recipe) {
    this.recipesService.activeRecipeEmitter.emit(recipe);
  }
}
