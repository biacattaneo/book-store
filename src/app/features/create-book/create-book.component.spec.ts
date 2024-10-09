import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CreateBookComponent } from './create-book.component';
import { BooksService } from '../../shared/services/books.service';
import { Books } from '../../shared/interfaces/books.interface';

describe('CreateBookComponent', () => {
  let component: CreateBookComponent;
  let fixture: ComponentFixture<CreateBookComponent>;
  let booksServiceSpy: jasmine.SpyObj<BooksService>;

  beforeEach(async () => {
    const booksServiceMock = jasmine.createSpyObj('BooksService', ['post']);

    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [],
      providers: [
        { provide: BooksService, useValue: booksServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBookComponent);
    component = fixture.componentInstance;
    booksServiceSpy = TestBed.inject(BooksService) as jasmine.SpyObj<BooksService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the BooksService when the form is submitted', () => {
    const book: Books = { id: '1', title: 'Livro Teste', autor: 'Autor Teste', editora: 'Editora Teste' };
    booksServiceSpy.post.and.returnValue(of(book));
    component.onSubmit(book);

    expect(booksServiceSpy.post).toHaveBeenCalledWith(book);
  });

  it('should show a success message when the book is created', () => {
    const snackBarSpy = spyOn(component.matSnackBar, 'open');

    const book: Books = { id: '1', title: 'Livro Teste', autor: 'Autor Teste', editora: 'Editora Teste' };
    booksServiceSpy.post.and.returnValue(of(book));
    component.onSubmit(book);

    expect(snackBarSpy).toHaveBeenCalledWith('Livro criado com sucesso', 'OK');
  });
});
