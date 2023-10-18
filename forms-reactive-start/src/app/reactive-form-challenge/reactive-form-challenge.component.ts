import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Observable, timer } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-reactive-form-challenge',
  template: `
    <form [formGroup]="form" (ngSubmit)="submitForm()">
      <div class="form-group">
        <label>
          Project name:
          <input formControlName="projectName" class="form-control">
        </label>
      </div>
      <div class="form-group">
        <label>
          Email:
          <input formControlName="email" class="form-control">
        </label>
      </div>
      <div class="form-group">
        <label>
          Project status:
          <select class="form-control" formControlName="projectStatus">
            <option *ngFor="let status of projectStatuses">{{status}}</option>
          </select>
        </label>
      </div>
      <button class="btn btn-success" [disabled]="!form.valid">Send</button>
    </form>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 2rem;
    }

    form {
      width: 30rem;
    }

    div, label, input, select {
      width: 100%;
    }`
  ]
})
export class ReactiveFormChallengeComponent {
  projectStatuses = ["Stable", "Critical", "Finished"];

  form = new FormGroup({
    "projectName": new FormControl("", Validators.required, this.projectNameValidator),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "projectStatus": new FormControl(this.projectStatuses[0]),
  })

  projectNameValidator(control: FormControl): Observable<ValidationErrors | null> {
    return timer(500)
      .pipe(map(_ => control.value === "Test" ? {'forbiddenProjectName': true} : null));
  }

  submitForm() {
    console.log(this.form.value);
  }
}
