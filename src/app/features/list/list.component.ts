import { Component, inject } from '@angular/core';
import { BooksService } from '../../shared/services/books.service';
import type { Books } from '../../shared/interfaces/books.interface';
import { CardComponent } from './components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  books: Books[] = [];
  booksService= inject(BooksService);

  ngOnInit(){
    this.booksService.getAll().subscribe((books) => {
      this.books = books;
    })
  }
}
