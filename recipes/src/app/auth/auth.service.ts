import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

const API_KEY = "AIzaSyD90uAwOVJ2rM1J34bBf8Cb-meL-oakDwc";
const AUTH_API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";

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

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(
      AUTH_API_URL,
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
      })
    )
  }
}
