import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  isEdit = false;
  private destroy$ = new Subject<void>();
  recipeForm: FormGroup;

  constructor(
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
      .subscribe(({id}) => this.isEdit = !!id);
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    this.recipeForm = this.fb.group({
      name: this.fb.control("1"),
      imageSrc: this.fb.control("2"),
      description: this.fb.control("3"),
      ingredients: this.fb.array([
        this.fb.group({
          name: this.fb.control("4"),
          amount: this.fb.control(5),
        })
      ]),
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
