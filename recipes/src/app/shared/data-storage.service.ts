import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipesService} from "../recipes/recipes.service";
import {map, switchMap, take} from "rxjs";
import {Recipe} from "./recipe.model";

const API_URL = "https://ng-complete-guide-recipe-e504e-default-rtdb.europe-west1.firebasedatabase.app";
const CURRENT_API_URL = `${API_URL}/recipes.json`;

@Injectable({providedIn: "root"})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {
  }

  storeRecipes() {
    this.recipesService.recipes$
      .pipe(
        take(1),
        switchMap(recipes => this.http.put(CURRENT_API_URL, recipes))
      )
      .subscribe();
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(CURRENT_API_URL)
      .pipe(map(recipes => recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients ?? []}))))
      .subscribe(recipes => this.recipesService.loadRecipes(recipes));
  }
}
