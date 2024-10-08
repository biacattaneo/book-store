import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import type { Books } from '../../../../shared/interfaces/books.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  books = input.required<Books>();

  @Output() edit = new EventEmitter();
  // @Output() delete = new EventEmitter();

  book = computed(() => this.books());

  onEdit() {
    this.edit.emit();
  }

  // onDelete() {
  //   this.delete.emit();
  // }
}
