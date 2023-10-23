import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {Observable} from "rxjs";
import {DataStorageService} from "../../services/data-storage.service";
import {RecipeItemComponent} from "./recipe-item/recipe-item.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  imports: [
    RecipeItemComponent,
    AsyncPipe,
    RouterLink,
    NgForOf
  ],
  standalone: true
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
