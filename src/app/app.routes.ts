import { BooksService } from './shared/services/books.service';
import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { getBook } from './shared/resolvers/get-book.resolver';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      book: () => {
        const booksService = inject(BooksService);
        return booksService.getAll();
        }
    },
    component: ListComponent
  },
  {
    path: 'create-book',
    loadComponent: () => import('./features/create-book/create-book.component').then((m) => m.CreateBookComponent),
  },
  {
    path: 'edit-book/:id',
    resolve: {
      book: getBook,
    },
    loadComponent: () => import('./features/edit-book/edit-book.component').then((m) => m.EditBookComponent)
  }
];
