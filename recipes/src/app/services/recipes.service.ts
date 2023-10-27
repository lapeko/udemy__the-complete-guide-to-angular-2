import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

import {Recipe} from "../shared/recipe.model";

const API_URL = "https://ng-complete-guide-recipe-e504e-default-rtdb.europe-west1.firebasedatabase.app";
const CURRENT_API_URL = `${API_URL}/recipes.json`;

@Injectable({providedIn: "root"})
export class RecipesService {

  constructor(private http: HttpClient) {
  }

  storeRecipes(recipes: Recipe[]) {
    return this.http.put(CURRENT_API_URL, recipes)
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(CURRENT_API_URL)
      .pipe(
        map(recipes => recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients ?? []}))),
      )
  }
}
