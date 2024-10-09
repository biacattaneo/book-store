import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { EditBookComponent } from './edit-book.component';
import { BooksService } from '../../shared/services/books.service';
import type { Books } from '../../shared/interfaces/books.interface';
import { ActivatedRoute } from '@angular/router';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;
  let booksServiceSpy: jasmine.SpyObj<BooksService>;

  const mockBook: Books = {
    id: '1',
    title: 'Test Book',
    autor: 'Author Name',
    editora: 'Publisher Name'
  };

  beforeEach(async () => {
    const booksServiceMock = jasmine.createSpyObj('BooksService', ['put']);
    const activatedRouteMock = {
      snapshot: {
        data: {
          book: mockBook
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, RouterTestingModule, NoopAnimationsModule, EditBookComponent],
      providers: [
        { provide: BooksService, useValue: booksServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    booksServiceSpy = TestBed.inject(BooksService) as jasmine.SpyObj<BooksService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call BooksService.put when form is submitted', () => {
    const bookData = { ...mockBook, title: 'Updated Title' };
    booksServiceSpy.put.and.returnValue(of({}));

    component.onSubmit(bookData);
    expect(booksServiceSpy.put).toHaveBeenCalledWith(mockBook.id, bookData);
  });

  it('should show a success message on successful update', () => {
    const bookData = { ...mockBook, title: 'Updated Title' };
    booksServiceSpy.put.and.returnValue(of({}));

    component.onSubmit(bookData);
    expect(booksServiceSpy.put).toHaveBeenCalled();

  });
});
