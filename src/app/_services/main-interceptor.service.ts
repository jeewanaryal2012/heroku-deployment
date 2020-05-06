import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      // setHeaders: {
      //   Authorization: `Bearer ${this.auth.getToken()}`
      // }
      headers: new HttpHeaders().append('startTimestamp', '1234')
    });
    return next.handle(request);
  }
}