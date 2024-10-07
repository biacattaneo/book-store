import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import type { Books } from '../../shared/interfaces/books.interface';
import { BooksService } from '../../shared/services/books.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {
  booksService = inject(BooksService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  @Output() submit = new EventEmitter<Books>();

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    autor: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    editora: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
  });

  onSubmit() {
    this.booksService.post({
      title: this.form.controls.title.value,
      autor: this.form.controls.autor.value,
      editora: this.form.controls.editora.value,
    })
      .pipe(filter(() => this.form.controls.title.status === 'VALID' && this.form.controls.autor.status === 'VALID' && this.form.controls.editora.status === 'VALID'))
      .subscribe(() => {
        this.matSnackBar.open('Livro criado com sucesso', 'OK');
        this.router.navigateByUrl('/');
      })
      this.matSnackBar.open('Campos obrigatórios');
  }
}
