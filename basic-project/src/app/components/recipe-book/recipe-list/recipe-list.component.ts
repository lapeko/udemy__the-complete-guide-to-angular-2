import { Component } from '@angular/core';
import { Recipe } from './recipe/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'Chorizo & mozzarella gnocchi bake',
      'Upgrade cheesy tomato pasta with gnocchi, chorizo and mozzarella for a comforting bake that makes an excellent midweek meal',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=440,400'
    ),
    new Recipe(
      'Chorizo & mozzarella gnocchi bake',
      'Upgrade cheesy tomato pasta with gnocchi, chorizo and mozzarella for a comforting bake that makes an excellent midweek meal',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=440,400'
    ),
  ];
}
