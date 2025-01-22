import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl +'auth';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Returns true if token exists
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(['/auth/login']);
  }

}
