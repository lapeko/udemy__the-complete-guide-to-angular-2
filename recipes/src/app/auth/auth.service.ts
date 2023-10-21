import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {UserModel} from "./user.model";

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
  user$ = new Subject<UserModel>();

  constructor(private http: HttpClient) {
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
      tap(this.handleAuthResponse)
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
      tap(this.handleAuthResponse)
    )
  }

  private handleAuthResponse(response: AuthResponse) {
    const {localId, email, refreshToken, expiresIn } = response;
    this.user$.next(new UserModel(localId, email, refreshToken, new Date(Date.now() + expiresIn)))
  }
}
