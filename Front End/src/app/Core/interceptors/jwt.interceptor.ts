import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login/login.service';
import {GlobalService} from '../services/global/global.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService, private globalPath:GlobalService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add JWT auth header if a user is logged in for API requests
    const accessToken = localStorage.getItem('access_token');
    const isApiUrl = request.url.startsWith(this.globalPath.path);
    if (accessToken && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }

    return next.handle(request);
  }
}
