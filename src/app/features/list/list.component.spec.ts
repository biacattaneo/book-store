import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BooksService } from '../../shared/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Books } from '../../shared/interfaces/books.interface';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let booksService: BooksService;
  let confirmationDialogService: ConfirmationDialogService;
  let router: Router;

  const mockBooks: Books[] = [
    { id: '1', title: 'Book 1', autor: 'Author 1', editora: 'editora 1' },
    { id: '2', title: 'Book 2', autor: 'Author 2', editora: 'editora 2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { books: mockBooks } } }
        },
        BooksService,
        ConfirmationDialogService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);
    confirmationDialogService = TestBed.inject(ConfirmationDialogService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize books from the route snapshot', () => {
    expect(component.books()).toEqual(mockBooks);
  });

  it('should call getAll and update books on ngOnInit', () => {
    spyOn(booksService, 'getAll').and.returnValue(of(mockBooks));
    component.ngOnInit();
    expect(booksService.getAll).toHaveBeenCalled();
    expect(component.books()).toEqual(mockBooks);
  });

  it('should navigate to edit-book on onEdit', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const mockBook = mockBooks[0];

    component.onEdit(mockBook);
    expect(navigateSpy).toHaveBeenCalledWith(['/edit-book', mockBook.id]);
  });

  it('should call delete on confirmation and update the list', () => {
    spyOn(confirmationDialogService, 'openDialog').and.returnValue(of(true));
    spyOn(booksService, 'delete').and.returnValue(of({}));
    spyOn(booksService, 'getAll').and.returnValue(of(mockBooks));

    const mockBook = mockBooks[0];

    component.onDelete(mockBook);

    expect(confirmationDialogService.openDialog).toHaveBeenCalled();
    expect(booksService.delete).toHaveBeenCalledWith(mockBook.id);
    expect(booksService.getAll).toHaveBeenCalled();
  });

  it('should not delete a book if the confirmation is false', () => {
    spyOn(confirmationDialogService, 'openDialog').and.returnValue(of(false));
    spyOn(booksService, 'delete');

    const mockBook = mockBooks[0];

    component.onDelete(mockBook);

    expect(confirmationDialogService.openDialog).toHaveBeenCalled();
    expect(booksService.delete).not.toHaveBeenCalled();
  });
});
