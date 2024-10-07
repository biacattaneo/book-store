import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Books } from '../interfaces/books.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Books[]>('/api/books');
  }
}
