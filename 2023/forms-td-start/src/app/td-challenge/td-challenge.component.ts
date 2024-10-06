import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="row">
        <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)" class="col-md-6">
          <div class="form-group">
            <input
              class="form-control"
              type="email"
              name="email"
              ngModel
              email
              required
              #email="ngModel"
            >
          </div>
          <p *ngIf="email.touched && email.invalid">Please, fill the email field with a correct value</p>
          <div class="form-group">
            <select class="form-control" name="subscription" [ngModel]="subscriptions[1]">
              <option *ngFor="let subscription of subscriptions" [value]="subscription">{{subscription}}</option>
            </select>
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="password"
              name="password"
              ngModel
              required
              #password="ngModel"
            >
          </div>
          <p *ngIf="password.touched && password.invalid">Please, fill the password field with a correct value</p>
          <button class="btn btn-success">Submit</button>
        </form>
        <p *ngIf="userForm.touched && userForm.invalid">Fill all the fields please</p>
      </div>
    </div>
  `,
  styleUrls: ['./td-challenge.component.css']
})
export class TdChallengeComponent {
  subscriptions = ["Basic", "Advanced", "Pro"];

  onSubmit(userForm: NgForm) {
    console.log(userForm.value);
  }
}
