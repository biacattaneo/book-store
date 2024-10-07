import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BooksService } from '../../shared/services/books.service';
import type { Books } from '../../shared/interfaces/books.interface';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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

  onSubmit() {
    this.booksService.put(this.book.id, {
      title: this.form.controls.title.value,
      autor: this.form.controls.autor.value,
      editora: this.form.controls.editora.value,
    })
      .pipe(filter(() => this.form.controls.title.status === 'VALID' && this.form.controls.autor.status === 'VALID' && this.form.controls.editora.status === 'VALID'))
      .subscribe(() => {
        this.matSnackBar.open('Livro atualizado com sucesso', 'OK');
        this.router.navigateByUrl('/');
      })
    this.matSnackBar.open('Campos obrigatórios');
  }
}
