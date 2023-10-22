import {Component, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Subject, take, takeUntil} from "rxjs";
import {finalize} from "rxjs/operators";

import {AuthService} from "./auth.service";
import {AlertDirective} from "../shared/alert/alert.directive";
import {AlertComponent} from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  @ViewChild('authForm') form: NgForm;
  @ViewChild(AlertDirective, {static: true}) alertHost: AlertDirective;

  isLoggingIn = true;
  errorMessage = "";
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
        next: () => this.router.navigate(["recipes"]),
        // error: errorMessage => this.errorMessage = errorMessage,
        error: errorMessage => this.showAlert(errorMessage),
      })
  }

  showAlert(errorMessage: string) {
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = errorMessage;
    componentRef.instance.close.pipe(
      take(1),
      takeUntil(this.destroy$),
    ).subscribe(() => componentRef.destroy());

  }
}
