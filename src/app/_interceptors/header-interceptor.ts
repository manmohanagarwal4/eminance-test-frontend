import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private _US: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    if (currentUser && currentUser.token && currentUser.userName) {
      request = request.clone({
        headers: new HttpHeaders({
          authKey: currentUser.token
        })
      });
    }
    return next.handle(request);
  }
}