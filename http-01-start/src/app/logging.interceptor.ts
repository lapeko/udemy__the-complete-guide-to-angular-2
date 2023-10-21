import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Request is on its way");
    return next.handle(request)
      .pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Response is on its way');
          console.log({event});
        }
      }));
  }
}
