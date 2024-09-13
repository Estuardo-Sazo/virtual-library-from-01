import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book, BookCreate } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/book`);
  }

  getBookId(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/book/find/${id}`);
  }

  getUploadImg(file: File): Observable<any> {
    const token = localStorage.getItem('access_token') || '';
    const headers = { Authorization: `Bearer ${token}` };
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload/book/`, formData,{ headers });
  }

  createBook(book: BookCreate): Observable<Book> {
    const token = localStorage.getItem('access_token') || '';
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<Book>(`${this.apiUrl}/book/create`, book, { headers });
  }
}
