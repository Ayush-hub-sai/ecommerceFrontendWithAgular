import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseURl = environment.apiUrl + 'dashboard';
  
  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get(this.baseURl); // Make sure it points to your dashboard endpoint
  }
}
