import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, pipe, Subject, takeUntil, tap, throwError, timer} from "rxjs";
import {UserModel} from "../auth/user.model";
import {Router} from "@angular/router";
import {LocalStorageKey} from "../shared/types";

const API_KEY = "AIzaSyD90uAwOVJ2rM1J34bBf8Cb-meL-oakDwc";
const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: "root"})
export class AuthService {
  private _user$ = new BehaviorSubject<UserModel>(null);
  private stopLogoutTimer$ = new Subject<void>();
  user$ = this._user$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  autoSignIn() {
    const {email, id, _token, _tokenExpirationDate} = JSON.parse(localStorage.getItem(LocalStorageKey.AuthUserData)) as {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } || {};

    const user = new UserModel(email, id, _token, new Date(_tokenExpirationDate));

    if (!user?.token) return;

    this._user$.next(user);
    const expiresIn = new Date(_tokenExpirationDate).getTime() - Date.now();
    this.runLogoutTimer(expiresIn)
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(
      SIGN_UP_URL,
      {
        email,
        password,
        returnSecureToken: true,
      },
      {params: new HttpParams().set('key', API_KEY)}
    ).pipe(
      catchError(error => {
        switch (error.error?.error?.message) {
          case 'EMAIL_EXISTS':
            return throwError(() => "The email address is already in use by another account");
          case 'OPERATION_NOT_ALLOWED':
            return throwError(() => "Password sign-in is disabled for this project");
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return throwError(() => "We have blocked all requests from this device due to unusual activity. Try again later");
          default:
            return throwError(() => "An unexpected error occurred. PLease, try again later");
        }
      }),
      tap(res => this.handleAuthResponse(res))
    )
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponse>(
      SIGN_IN_URL,
      {
        email,
        password,
        returnSecureToken: true,
      },
      {params: new HttpParams().set('key', API_KEY)}
    ).pipe(
      catchError(error => {
        switch (error.error?.error?.message) {
          case 'EMAIL_NOT_FOUND':
            return throwError(() => "There is no user record corresponding to this identifier. The user may have been deleted");
          case 'INVALID_PASSWORD':
          case 'INVALID_LOGIN_CREDENTIALS':
            return throwError(() => "The password is invalid or the user does not have a password");
          case 'USER_DISABLED':
            return throwError(() => "The user account has been disabled by an administrator");
          default:
            return throwError(() => "An unexpected error occurred. PLease, try again later");
        }
      }),
      tap(res => this.handleAuthResponse(res))
    )
  }

  logout() {
    localStorage.removeItem(LocalStorageKey.AuthUserData);
    this._user$.next(null);
    this.router.navigate(['auth']);
    this.stopLogoutTimer$.next();
  }

  private handleAuthResponse(response: AuthResponse) {
    const {localId, email, idToken, expiresIn } = response;
    const expiresInNum = parseInt(expiresIn) * 1000;
    const user = new UserModel(localId, email, idToken, new Date(Date.now() + expiresInNum));
    this._user$.next(user);
    localStorage.setItem(LocalStorageKey.AuthUserData, JSON.stringify(user));
    this.runLogoutTimer(expiresInNum);
  }

  private runLogoutTimer(expiresIn: number) {
    timer(expiresIn)
      .pipe(takeUntil(this.stopLogoutTimer$))
      .subscribe(() => this.logout());
  }
}
