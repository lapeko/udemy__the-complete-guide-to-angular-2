import { Component, Input } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLinkActive} from "@angular/router";

import {Recipe} from "../../../shared/recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    RouterLinkActive
  ]
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() isLast: boolean;
}
