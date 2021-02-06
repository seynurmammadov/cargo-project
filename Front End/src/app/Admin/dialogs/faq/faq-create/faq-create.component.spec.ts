import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCreateComponent } from './faq-create.component';

describe('FaqCreateComponent', () => {
  let component: FaqCreateComponent;
  let fixture: ComponentFixture<FaqCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
