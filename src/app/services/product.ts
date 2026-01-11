import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  // Requirement: Pull specific records (e.g., page 9 size 10 pulls 90-100)
  getPaginated(page: number, size: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?page=${page}&size=${size}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }
}