import { colors } from './../../../../node_modules/json-server/node_modules/chalk/source/index.d';
import { Component, inject } from '@angular/core';
import { BooksService } from '../../shared/services/books.service';
import type { Books } from '../../shared/interfaces/books.interface';
import { CardComponent } from './components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deletar Livro</h2>
<mat-dialog-content>
  Tem certeza que quer deletar este livro?
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button (click)="onNo()">Não</button>
  <button mat-raised-button color="accent" (click)="onYes()" cdkFocusInitial>Sim</button>
</mat-dialog-actions>
`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialofComponent {

  matDialogRef = inject(MatDialogRef);

  onNo(){
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  books: Books[] = [];
  booksService = inject(BooksService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit() {
    this.booksService.getAll().subscribe((books) => {
      this.books = books;
    })
  }

  onEdit(book: Books) {
    this.router.navigate(['/edit-book', book.id]);
  }

  onDelete(book: Books) {
    this.matDialog.open(ConfirmationDialofComponent).afterClosed()
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
      this.booksService.delete(book.id).subscribe((err) => {
        this.ngOnInit();
      })
    });
  }
}
