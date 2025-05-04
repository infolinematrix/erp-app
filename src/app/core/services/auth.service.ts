import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { environment } from '../../../environments/environment';


interface UserSession {
  token: string;
  [key: string]: any; // Extendable for additional session properties
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private sessionService: SessionService) {}

  /**
   * Retrieve the authentication token from the session
   * @returns The token as a string or null if not available
   */
  getToken(): string | null {
    const session = this.sessionService.getSession<UserSession>();

    if (session && session.token) {
      return session.token;
    }

    console.warn('Token is missing or session is invalid.');
    return null;
  }

  /**
   * Check if the app is running in production mode
   * @returns True if the app is in production mode, otherwise false
   */
  isProduction(): boolean {
    return environment.production;
  }
}

