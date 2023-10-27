import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

import {RecipeItemComponent} from "./recipe-item/recipe-item.component";
import {AppState} from "../../../store";
import {fetchRecipes} from "../../../store/recipes/recipes.actions";
import {recipes} from "../../../store/recipes/recipes.selectors";

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
  recipes$ = this.store.select(recipes);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(fetchRecipes());
  }
}
