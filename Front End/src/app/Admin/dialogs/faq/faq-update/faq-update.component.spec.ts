import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqUpdateComponent } from './faq-update.component';

describe('FaqUpdateComponent', () => {
  let component: FaqUpdateComponent;
  let fixture: ComponentFixture<FaqUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
