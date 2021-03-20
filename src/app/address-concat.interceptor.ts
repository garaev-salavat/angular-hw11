import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from './user.interface';

@Injectable()
export class AddressConcatInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<Users>,
    next: HttpHandler
  ): Observable<HttpEvent<Users>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<Users>) => {
        if (event instanceof HttpResponse) {
          const modEvent = event.clone({
            body: event.body.map((user) => {
              const addressname = `(${user.address.zipcode}), ${user.address.city}, ${user.address.street}, ${user.address.suite}`;
              return {...user, addressname};
            }),
          });
          return modEvent;
        }
      })
    );
  }
}
