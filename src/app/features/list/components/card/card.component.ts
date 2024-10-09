import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import type { Books } from '../../../../shared/interfaces/books.interface';
import { BookComponent } from "../../../../shared/icons/book-icon/book-icon.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, BookComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input({ required: true }) books!: Books;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  book = computed(() => this.books);

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
