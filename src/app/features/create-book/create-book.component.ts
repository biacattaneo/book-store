import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { Books } from '../../shared/interfaces/books.interface';
import { BooksService } from '../../shared/services/books.service';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';


@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {
  booksService = inject(BooksService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  @Output() send = new EventEmitter<Books>();

  onSubmit(book: Books) {
    if (book.title.length > 0 && book.autor.length > 0 && book.editora.length > 0) {
      this.booksService.post(book)
      .subscribe(() => {
        this.matSnackBar.open('Livro criado com sucesso', 'OK');
        this.router.navigateByUrl('/');
      })
    }
  }
}
