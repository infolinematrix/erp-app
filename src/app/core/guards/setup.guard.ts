import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { remult } from 'remult';
import { CenterMaster } from '../../../shared/CenterMaster.entity';

@Injectable({
  providedIn: 'root',
})
export class SetupGuard implements CanActivate {
  constructor(private router: Router, private authService:AuthService) {}

  /**
   * Determines if the route can be activated
   * @returns True if authenticated, otherwise navigates to login and returns false
   */
  async canActivate(
    
  ): Promise<boolean | UrlTree> {
    console.log('SetupGuard: Initialize....');
    
    // Check if at least one active center exists
    const hasActiveCenter = await this.hasCenter();
    if (!hasActiveCenter) {
      console.log('Center not found. Redirecting to Setup...');
      return this.router.createUrlTree(['/setup']);
    }
    return true;
  }

  /**
   * Checks if the user is authenticated
   * @returns True if authenticated, otherwise false
   */
  private async hasCenter(): Promise<boolean> {
    try {
      const data = await remult.repo(CenterMaster).find({where:{is_active: 1}});
      if (data.length == 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking center:', error);
      return false;
    }
  }

  
}
