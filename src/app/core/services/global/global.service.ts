import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: any = environment.apiUrl;

  constructor() { }
}
