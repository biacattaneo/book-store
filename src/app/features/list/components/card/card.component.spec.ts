import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Books } from '../../../../shared/interfaces/books.interface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    const mockBook: Books = {
      id: '1',
      title: 'Sample Book',
      autor: 'Author Name',
      editora: 'Publisher Name'
    };

    component.books = mockBook;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the book title', () => {
    const titleElement = fixture.nativeElement.querySelector('#card-title');
    expect(titleElement.textContent).toContain('Sample Book');
  });

  it('should display the author name', () => {
    const authorElement = fixture.nativeElement.querySelector('#card-author');
    expect(authorElement.textContent).toContain('Author Name');
  });

  it('should display the publisher name', () => {
    const publisherElement = fixture.nativeElement.querySelector('#card-publisher');
    expect(publisherElement.textContent).toContain('Publisher Name');
  });

  it('should call onEdit when edit button is clicked', () => {
    spyOn(component, 'onEdit');
    const editButton = fixture.nativeElement.querySelector('#card-edit-button');
    editButton.click();
    expect(component.onEdit).toHaveBeenCalled();
  });

  it('should call onDelete when delete button is clicked', () => {
    spyOn(component, 'onDelete');
    const deleteButton = fixture.nativeElement.querySelector('#card-delete-button');
    deleteButton.click();
    expect(component.onDelete).toHaveBeenCalled();
  });
});
