import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://localhost:3000/auth';
  isAuthenticated = false;
  isCreated = false;

  constructor(private http: HttpClient) { }

  login(user: User) {
    this.isCreated = true;
    this.isAuthenticated = true;
    return this.http.post<User>(`${this.baseURL}/login`, user);
  }

  logout() {
    this.isAuthenticated = false;
    return this.http.get(`${this.baseURL}/logout`);
  }

  register(user: User){
    this.isCreated = true;
    this.isAuthenticated = false;
    return this.http.post<User>(`${this.baseURL}/register`, user);

  }

}
