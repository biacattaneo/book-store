import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackToHomeComponent } from './back-to-home.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BackToHomeComponent', () => {
  let component: BackToHomeComponent;
  let fixture: ComponentFixture<BackToHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToHomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              data: {}
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BackToHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
