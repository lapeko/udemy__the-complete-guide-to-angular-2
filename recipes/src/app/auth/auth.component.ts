import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import {filter, Subject, take, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";

import {AlertDirective} from "../shared/alert/alert.directive";
import {AlertComponent} from "../shared/alert/alert.component";
import {SpinnerComponent} from "../shared/spinner/spinner.component";
import {signIn, signUp} from "../../store/auth/auth.actions";
import {AppState} from "../../store";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    SpinnerComponent,
    AlertDirective,
    NgIf,
    AsyncPipe
  ]
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') form: NgForm;
  @ViewChild(AlertDirective, {static: true}) alertHost: AlertDirective;

  isLoggingIn = true;
  isLoading$ = this.store.select(state => state.auth.isLoading);

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(state => state.auth.error).pipe(
      takeUntil(this.destroy$),
      filter(error => !!error),
      tap(error => this.showAlert(error))
    ).subscribe();
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

    const action = this.isLoggingIn ? signIn : signUp;
    this.store.dispatch(action({payload: {email, password}}));

    this.form.resetForm();
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
