import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePtoductComponent } from './create-ptoduct.component';

describe('CreatePtoductComponent', () => {
  let component: CreatePtoductComponent;
  let fixture: ComponentFixture<CreatePtoductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePtoductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePtoductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
