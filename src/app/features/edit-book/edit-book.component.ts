import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BooksService } from '../../shared/services/books.service';
import type { Books } from '../../shared/interfaces/books.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})

export class EditBookComponent {
  booksService = inject(BooksService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  book: Books = inject(ActivatedRoute).snapshot.data['book'];

  form = new FormGroup({
    title: new FormControl<string>(this.book.title, {
      nonNullable: true,
      validators: Validators.required
    }),
    autor: new FormControl<string>(this.book.autor, {
      nonNullable: true,
      validators: Validators.required
    }),
    editora: new FormControl<string>(this.book.editora, {
      nonNullable: true,
      validators: Validators.required
    }),
  });

  onSubmit(book: Books) {
    // const book: Books = this.form.value as Books;
    this.booksService.put(this.book.id, book)
      .pipe(filter(() => this.form.controls.title.status === 'VALID' && this.form.controls.autor.status === 'VALID' && this.form.controls.editora.status === 'VALID'))
      .subscribe(() => {
        this.matSnackBar.open('Livro atualizado com sucesso', 'OK');
        this.router.navigateByUrl('/');
      })
    this.matSnackBar.open('Campos obrigatórios');
  }
}
