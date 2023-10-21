import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../recipes.service";
import {Observable} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(
    private recipesService: RecipesService,
    private dataStorage: DataStorageService,
  ) {
  }

  ngOnInit() {
    this.dataStorage.fetchRecipes();
    this.recipes$ = this.recipesService.recipes$;
  }
}
