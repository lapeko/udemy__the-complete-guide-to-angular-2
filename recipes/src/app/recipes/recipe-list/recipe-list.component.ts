import { Component } from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recepies = [new Recipe(
    "A test recipe",
    "This is simply a test",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQelhbOB93YxhEP2NtOfILtkyPlRqCwt5BhRzd4daMJRAJMouaE-iU0moyh8nZ2vl3bZaECsXPeZ6HybyZM2no"
  ), new Recipe(
    "A test recipe",
    "This is simply a test",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQelhbOB93YxhEP2NtOfILtkyPlRqCwt5BhRzd4daMJRAJMouaE-iU0moyh8nZ2vl3bZaECsXPeZ6HybyZM2no"
  )];
}
