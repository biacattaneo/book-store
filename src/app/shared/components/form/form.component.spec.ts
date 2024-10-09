import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Books } from '../../interfaces/books.interface';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let matSnackBar: MatSnackBar;
  let snackBarSpy: jasmine.Spy;

  const mockBook: Books = {
    id: '1',
    title: 'Sample Title',
    autor: 'Sample Author',
    editora: 'Sample Publisher',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        FormComponent
      ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: { open: jasmine.createSpy('open') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    matSnackBar = TestBed.inject(MatSnackBar);
    snackBarSpy = matSnackBar.open as jasmine.Spy;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with book data when provided', () => {
    component.book = mockBook;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.value).toEqual({
      title: 'Sample Title',
      autor: 'Sample Author',
      editora: 'Sample Publisher'
    });
  });

  it('should initialize an empty form when no book is provided', () => {
    component.book = null;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.value).toEqual({
      title: '',
      autor: '',
      editora: ''
    });
  });

  it('should show snack bar message when the form is invalid', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#btn-save-book')).nativeElement;
    submitButton.click();

    expect(snackBarSpy).toHaveBeenCalledWith('Campos obrigatórios');
  });

  it('should mark form as invalid when required fields are missing', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.form.controls['title'].setValue('');
    component.form.controls['autor'].setValue('');
    component.form.controls['editora'].setValue('');

    const submitButton = fixture.debugElement.query(By.css('#btn-save-book')).nativeElement;
    submitButton.click();

    expect(component.form.invalid).toBeTrue();
    expect(snackBarSpy).toHaveBeenCalledWith('Campos obrigatórios');
  });
});
