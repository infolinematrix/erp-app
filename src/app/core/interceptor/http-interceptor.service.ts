import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ErrorHandlingService } from '../services/error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add authentication token to the request headers, if available
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Log the modified request for debugging
    if (!this.authService.isProduction()) {
      console.log('Modified Request:', request);
    }

    return next.handle(request).pipe(
      // Log successful responses
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && !this.authService.isProduction()) {
          console.log('Response:', event);
        }
      }),
      // Handle errors
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        this.errorHandlingService.handleError(error);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
