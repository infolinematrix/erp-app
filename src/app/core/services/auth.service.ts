// src/app/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { remult } from 'remult';

import { environment } from '../../../environments/environment';
// import { UserInfoExtended } from '../types/UserInfo';


@Injectable({
  providedIn: 'root',
})


export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  
  private initializeAuthState() {
    // const token = this.getToken();
    const user = localStorage.getItem('currentUser');
    
    // if (token && user) {
    //   const userObj = JSON.parse(user);
    //   this.setRemultUser(userObj);
    //   this.currentUserSubject.next(userObj);
    // }
    if (user) {
      const userObj = JSON.parse(user);
      this.setRemultUser(userObj);
      this.currentUserSubject.next(userObj);
    }
  }

  // login(credentials: { username: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/sign-in`, credentials);
  // }

  setAuthData(response: { access_token: string }, username: string): void {
    // Store token
    this.setToken(response.access_token);

    // Create user object
    const userObj = {
      username,
      // Add other user properties you might need
      roles: ['user'], // Example roles
    };

    // Store user
    this.setCurrentUser(userObj);

    // Set Remult user context
    this.setRemultUser(userObj);
  }

  private setRemultUser(user: any): void {
    //TODO: extent UserInfo
    const currentUser = {
        id: user.id.toString(),
        user_type: user.user_type,
        user_center: user.center_code,
        name: user.name,
        email: user.username,
        roles: user.roles || [],
        permissions: user.permissions || [],
      };
      remult.user = currentUser  ;
      // debugger;
      // console.log(remult.user);
      
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  
  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }


  logout(): void {
    // localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    remult.user = undefined; // Clear Remult user context
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated(): boolean {
    // debugger;
    // return !!this.getToken();
    return !!this.getCurrentUser();
  }
}
