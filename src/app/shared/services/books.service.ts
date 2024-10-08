import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Books } from '../interfaces/books.interface';
import type { BooksPayload } from '../interfaces/payload-books.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Books[]>('/api/books');
  }

  get(id: string) {
    return this.httpClient.get<Books>(`/api/books/${id}`);
  }

  post(payload: BooksPayload) {
    return this.httpClient.post('/api/books', payload);
  }

  put(id: string, payload: BooksPayload) {
    return this.httpClient.put(`/api/books/${id}`, payload);
  }

  delete(id: string) {
    return this.httpClient.delete(`/api/books/${id}`);
  }
}
