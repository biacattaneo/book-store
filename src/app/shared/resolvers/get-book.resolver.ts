import { inject } from "@angular/core";
import type { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BooksService } from "../services/books.service";

export const getBook = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const booksService = inject(BooksService);
  return booksService.get(route.paramMap.get('id') as string);
};
