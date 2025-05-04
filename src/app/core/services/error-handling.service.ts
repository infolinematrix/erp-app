import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.generateErrorMessage(error);

    // Centralized logging
    this.logError(errorMessage);

    // Optionally: Notify the user via UI (Toast, Modal, etc.)
    // this.notifyUser(errorMessage);

    // Propagate the error to the caller
    return throwError(() => new Error(errorMessage));
  }

  private generateErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      return `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      return `Server Error: Code ${error.status}, Message: ${error.message}`;
    }
  }

  private logError(message: string): void {
    console.error(`[ErrorHandlingService] ${message}`);
    // Optionally integrate with external logging services (e.g., Sentry, LogRocket, etc.)
  }

  // Optional: Notify the user via a UI component
  private notifyUser(message: string): void {
    // Replace this with a toast/notification service
    // Example: this.toastService.showError(message);
    console.warn(`[User Notification] ${message}`);
  }
}
