import { Books } from './books.interface';

export type BooksPayload = Omit<Books, 'id'>;
