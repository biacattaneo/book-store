import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Books } from '../../interfaces/books.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Output() send = new EventEmitter<Books>();
  @Input() book: Books | null = null;

  form!: FormGroup;

  ngOnInit(): void {
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
    });
  }
  onFormSubmit(book: Books) {
    console.log('Book data received from form:', book);
  }

  onSubmit(event: any) {
    console.log('Book data received from form2:', event)
    if (this.form.valid) {
      const book = this.form.value as Books;
      console.log(1);
      this.send.emit(book);
    }
    else
    console.log(2);
  }
}
