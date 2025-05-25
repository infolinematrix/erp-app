import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService:AuthService) {}

  /**
   * Determines if the route can be activated
   * @returns True if authenticated, otherwise navigates to login and returns false
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    const isSignInPage = state.url.includes('/sign-in');

    if (this.isUserAuthenticated()) {
      if (isSignInPage) {
        return this.router.createUrlTree(['/dashboard']);
      }
      return true;
    } else {
      console.log('Access denied. Redirecting to login...');
      return this.router.createUrlTree(['/sign-in']);
    }
  }

  /**
   * Checks if the user is authenticated
   * @returns True if authenticated, otherwise false
   */
  private isUserAuthenticated(): boolean {
    try {
      return this.authService.isAuthenticated();
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }
}
