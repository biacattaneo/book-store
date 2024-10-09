import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { Books } from '../interfaces/books.interface';
import { BooksPayload } from '../interfaces/payload-books.interface';

describe('BooksService', () => {
  let service: BooksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService]
    });
    service = TestBed.inject(BooksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all books', () => {
    const mockBooks: Books[] = [
      { id: '1', title: 'Book 1', autor: 'Author 1', editora: 'editora 1' },
      { id: '2', title: 'Book 2', autor: 'Author 2', editora: 'editora 2' }
    ];

    service.getAll().subscribe(books => {
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
    });

    const req = httpTestingController.expectOne('/api/books');
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should retrieve a single book by ID', () => {
    const mockBook: Books = { id: '1', title: 'Book 1', autor: 'Author 1', editora: 'editora 1' };

    service.get('1').subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne('/api/books/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should create a new book', () => {
    const mockPayload: BooksPayload = { title: 'New Book', autor: 'New Author', editora: 'New editora' };

    service.post(mockPayload).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/api/books');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockPayload);
  });

  it('should update an existing book', () => {
    const mockPayload: BooksPayload = { title: 'Updated Book', autor: 'Updated Author', editora: 'Updated editora' };

    service.put('1', mockPayload).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/api/books/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockPayload);
  });

  it('should delete a book by ID', () => {
    service.delete('1').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/api/books/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
