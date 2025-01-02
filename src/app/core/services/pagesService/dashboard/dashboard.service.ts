import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5000/api/dashboard';
  
  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get(this.apiUrl); // Make sure it points to your dashboard endpoint
  }
}
