import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionKey = 'user_session';
  private sessionExpiryKey = 'user_session_expiry'; // Optional for session expiration

  constructor() {}

  /**
   * Set the session data in localStorage
   * @param sessionData - The session data to store
   * @param expiryInMinutes - Optional session expiration time in minutes
   */
  setSession<T>(sessionData: T, expiryInMinutes?: number): void {
    try {
      const sessionString = JSON.stringify(sessionData);
      localStorage.setItem(this.sessionKey, sessionString);

      if (expiryInMinutes) {
        const expiryTime = new Date().getTime() + expiryInMinutes * 60000;
        localStorage.setItem(this.sessionExpiryKey, expiryTime.toString());
      }
    } catch (error) {
      console.error('Error saving session data:', error);
    }
  }

  /**
   * Retrieve session data from localStorage
   * @returns The parsed session data or null if not found/invalid
   */
  getSession<T>(): T | null {
    try {
      const session = localStorage.getItem(this.sessionKey);
      if (!session) return null;

      // Check if session has expired
      const expiryTime = localStorage.getItem(this.sessionExpiryKey);
      if (expiryTime && new Date().getTime() > parseInt(expiryTime, 10)) {
        this.endSession(); // Clear expired session
        return null;
      }

      return JSON.parse(session) as T;
    } catch (error) {
      console.error('Error retrieving session data:', error);
      return null;
    }
  }

  /**
   * End the session by removing the session data
   */
  endSession(): void {
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem(this.sessionExpiryKey); // Remove expiry key if set
  }

  /**
   * Check if the user is authenticated
   * @returns True if session exists and is not expired
   */
  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  /**
   * Handle session expiry logic (Custom logic can be added here)
   */
  handleSessionExpiry(): void {
    console.warn('Session has expired. Implement custom logic here.');
    this.endSession();
  }
}
