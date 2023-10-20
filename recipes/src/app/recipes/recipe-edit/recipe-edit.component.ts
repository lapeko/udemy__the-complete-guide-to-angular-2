import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeInEdit: Recipe;
  recipeForm: FormGroup;
  private _recipeIndex: number;
  private destroy$ = new Subject<void>();

  constructor(
    private recipesService: RecipesService,
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
        switchMap(({id}) => this.recipesService.recipes.pipe(
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
    const createdIndex = this.recipesService.addRecipe(this.recipeForm.value);
    this.router.navigate(['..', createdIndex], {relativeTo: this.activatedRoute});
  }

  updateRecipe() {
    this.recipesService.updateRecipe(this.recipeForm.value, this._recipeIndex - 1);
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
}
