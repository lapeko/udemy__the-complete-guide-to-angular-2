import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipesService} from "../recipes/recipes.service";
import {switchMap, take} from "rxjs";

const API_URL = "https://ng-complete-guide-recipe-e504e-default-rtdb.europe-west1.firebasedatabase.app";

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
        switchMap(recipes => this.http.put(`${API_URL}/recipes.json`, recipes))
      )
      .subscribe(res => console.log(res));
  }
}
