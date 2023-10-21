import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @ViewChild('authForm') form: NgForm;

  isLoggingIn = true;
  errorMessage = "";
  isLoading = false;

  constructor(private authService: AuthService) {
  }

  toggleAuth() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  onSubmit() {
    if (!this.form.valid) return;
    const {email, password} = this.form.value;
    if (!email?.length || !password?.length) return;

    this.isLoading = true;
    this.errorMessage = "";
    this.form.resetForm();

    const observable = this.isLoggingIn
      ? this.authService.signIn(email, password)
      : this.authService.signUp(email, password);

    observable
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => console.log(res),
        error: errorMessage => this.errorMessage = errorMessage,
      })
  }
}
