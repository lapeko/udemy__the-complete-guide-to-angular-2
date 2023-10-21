import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";

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
    )
  }
}
