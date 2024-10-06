import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    RecipeListComponent
  ]
})
export class RecipesComponent {
}
