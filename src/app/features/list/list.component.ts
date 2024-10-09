import { Component, inject, signal } from '@angular/core';
import { BooksService } from '../../shared/services/books.service';
import type { Books } from '../../shared/interfaces/books.interface';
import { CardComponent } from './components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { MatIconModule } from '@angular/material/icon';
import { AddIconComponent } from "../../shared/icons/add-icon/add-icon.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, NoItemsComponent, MatIconModule, AddIconComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  books = signal<Books[]>(inject(ActivatedRoute).snapshot.data['books']);

  booksService = inject(BooksService);
  router = inject(Router);
  confirmationDialogService = inject(ConfirmationDialogService);

  ngOnInit() {
    this.booksService.getAll().subscribe((books) => {
      this.books.set(books);
    });
  }

  onEdit(book: Books) {
    this.router.navigate(['/edit-book', book.id]);
  }

  onDelete(book: Books) {
    this.confirmationDialogService.openDialog()
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
      this.booksService.delete(book.id).subscribe(() => {
        this.ngOnInit();
      })
    });
  }
}
