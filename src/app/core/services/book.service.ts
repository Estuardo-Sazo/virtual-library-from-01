import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book`);
  }
}
