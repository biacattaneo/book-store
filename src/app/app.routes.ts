import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateBookComponent } from './features/create-book/create-book.component';

export const routes: Routes = [
  {
  path: '',
  component: ListComponent
},
  {
    path: 'create-book',
    component: CreateBookComponent
  }
];
