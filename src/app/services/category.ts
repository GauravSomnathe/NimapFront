import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Ensure it says "class", NOT "interface" or "type"
export class CategoryService {
  private api = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  create(name: string): Observable<any> {
    return this.http.post(this.api, { category_name: name });
  }

  update(id: number, name: string): Observable<any> {
    return this.http.put(`${this.api}/${id}`, { category_name: name });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}