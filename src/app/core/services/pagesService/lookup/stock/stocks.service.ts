import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private baseUrl = environment.apiUrl + 'stock'; // Ensure this matches your API URL

  constructor(private http: HttpClient) { }

  getAllStocks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  addStock(itemId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { itemId, quantity });
  }

  reduceStock(itemId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/reduce`, { itemId, quantity });
  }

  setOutOfStock(itemId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/outofstock`, { itemId });
  }

  getStockStatus(itemId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${itemId}`);
  }

  updateStock(itemId: string, quantity: number): Observable<any> { 
    return this.http.put(`${this.baseUrl}/update`, { itemId, quantity });
  }

  deleteStock(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
