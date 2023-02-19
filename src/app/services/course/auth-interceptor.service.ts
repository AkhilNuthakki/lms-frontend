import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.userService.getUser().pipe(
      take(1),
      exhaustMap(user => {
        
        if (!user) {
          return next.handle(req);
        }
        console.log('usertoken: ', user);
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}