import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeInEdit: Recipe;
  recipeForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(({id}) => {
        this.recipeInEdit = id ? this.recipesService.recipes[id - 1] : null;
      });
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    const ingredients = this.recipeInEdit?.ingredients
      ? this.recipeInEdit.ingredients.map(ingredient => this.fb.group({
        name: this.fb.control(ingredient.name),
        amount: this.fb.control(ingredient.amount),
      }))
      : [];
    this.recipeForm = this.fb.group({
      name: this.fb.control(this.recipeInEdit?.name ?? ""),
      imagePath: this.fb.control(this.recipeInEdit?.imagePath),
      desc: this.fb.control(this.recipeInEdit?.desc),
      ingredients: this.fb.array(ingredients),
    });
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: this.fb.control("new"),
      amount: this.fb.control(6),
    }));
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
