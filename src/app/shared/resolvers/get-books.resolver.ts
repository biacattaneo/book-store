import { inject } from "@angular/core";
import { BooksService } from "../services/books.service";

export const getBooks = () => {
  const booksService = inject(BooksService);
  return booksService.getAll();
};
