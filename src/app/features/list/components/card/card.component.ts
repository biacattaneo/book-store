import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import type { Books } from '../../../../shared/interfaces/books.interface';
import { BookComponent } from "../../../../shared/icons/book/book.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, BookComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'] // Corrigi o nome do atributo
})
export class CardComponent {
  @Input({ required: true }) books!: Books; // Use Books diretamente

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  book = computed(() => this.books); // Computed a partir do books direto

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
