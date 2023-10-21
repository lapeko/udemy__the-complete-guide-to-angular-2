import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {map, Observable, switchMap, take} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user$.pipe(
      take(1),
      map(user => user?.token),
      switchMap(token => {
        if (!token) return next.handle(request);
        return next.handle(request.clone({params: request.params.append("auth", token)}));
      })
    );
  }
}
