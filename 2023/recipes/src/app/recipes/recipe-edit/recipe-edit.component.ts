import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";

import {Recipe} from "../../shared/recipe.model";
import {AppState} from "../../../store";
import {recipes} from "../../../store/recipes/recipes.selectors";
import {addRecipe, updateRecipe} from "../../../store/recipes/recipes.actions";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeInEdit: Recipe;
  recipeForm: FormGroup;
  private _recipeIndex: number;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        tap(({id}) => this._recipeIndex = id),
        switchMap(({id}) => this.store.select(recipes).pipe(
          map(recipes => recipes[id - 1])
        )),
      )
      .subscribe(activeRecipe => this.recipeInEdit = activeRecipe);
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    const ingredients = this.recipeInEdit?.ingredients
      ? this.recipeInEdit.ingredients.map(ingredient => this.fb.group({
        name: this.fb.control(ingredient.name, Validators.required),
        amount: this.fb.control(ingredient.amount, [Validators.required, Validators.min(1)]),
      }))
      : [];
    this.recipeForm = this.fb.group({
      name: this.fb.control(this.recipeInEdit?.name ?? "", Validators.required),
      imagePath: this.fb.control(this.recipeInEdit?.imagePath, Validators.required),
      desc: this.fb.control(this.recipeInEdit?.desc, Validators.required),
      ingredients: this.fb.array(ingredients),
    });
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: this.fb.control("", Validators.required),
      amount: this.fb.control(null, [Validators.required, Validators.min(1)]),
    }));
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createRecipe() {
    this.store.dispatch(addRecipe({payload: this.recipeForm.value}));
  }

  updateRecipe() {
    this.store.dispatch(updateRecipe({payload: {index: this._recipeIndex - 1, recipe: this.recipeForm.value}}));
  }
}
