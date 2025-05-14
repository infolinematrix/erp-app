import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  /**
   * Determines if the route can be activated
   * @returns True if authenticated, otherwise navigates to login and returns false
   */
  canActivate(): boolean | UrlTree {
    if (this.isUserAuthenticated()) {
      return true;
    } else {
      console.log('Access denied. Redirecting to login...');
      return this.router.createUrlTree(['/auth/sign-in']);
    }
  }

  /**
   * Checks if the user is authenticated
   * @returns True if authenticated, otherwise false
   */
  private isUserAuthenticated(): boolean {
    try {
      return this.sessionService.isAuthenticated();
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }
}
