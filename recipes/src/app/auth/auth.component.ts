import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @ViewChild('authForm') form: NgForm;

  isLoggingIn = true;

  constructor(private authService: AuthService) {
  }

  toggleAuth() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  onSubmit() {
    if (!this.form.valid) return;
    const {email, password} = this.form.value;
    if (!email?.length || !password?.length) return;
    this.isLoggingIn ? this.signIn() : this.signUp();
    this.form.resetForm();
  }

  private signIn() {
    throw new Error('Not implemented');
  }

  private signUp() {
    const {email, password} = this.form.value;
    this.authService.signUp(email, password)
      .subscribe({
        next: res => console.log(res),
        error: error => console.log('An error occurred', error),
      });
  }
}
