import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Books } from '../../interfaces/books.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule], // Incluindo MatSelectModule
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  matSnackBar = inject(MatSnackBar);

  @Output() send = new EventEmitter<Books>();
  @Input() book: Books | null = null;

  form!: FormGroup;
  editoras: string[] = []; // Variável para armazenar as editoras carregadas do localStorage

  ngOnInit(): void {
    this.loadEditorasFromLocalStorage(); // Carregar editoras na inicialização

    this.form = new FormGroup({
      title: new FormControl<string>(this.book?.title ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      autor: new FormControl<string>(this.book?.autor ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      editora: new FormControl<string>(this.book?.editora ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      image: new FormControl<string | null>(this.book?.image ?? null, {
        nonNullable: false
      })
    });
  }

  loadEditorasFromLocalStorage() {
    const storedEditoras = localStorage.getItem('editoras');
    if (storedEditoras) {
      this.editoras = JSON.parse(storedEditoras);
    } else {
      this.editoras = ['Rocco', 'Arqueiro', 'Harper Collins'];
      localStorage.setItem('editoras',JSON.stringify(this.editoras));
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.status === 'VALID') {
      const book = this.form.value as Books;
      this.send.emit(book);
      this.matSnackBar.open('Livro salvo com sucesso!', 'OK', { duration: 2000 });
    } else {
      this.matSnackBar.open('Preencha todos os campos obrigatórios.', 'OK', { duration: 2000 });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.patchValue({ image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
