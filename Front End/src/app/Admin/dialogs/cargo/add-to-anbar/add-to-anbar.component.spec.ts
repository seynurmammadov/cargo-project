import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToAnbarComponent } from './add-to-anbar.component';

describe('AddToAnbarComponent', () => {
  let component: AddToAnbarComponent;
  let fixture: ComponentFixture<AddToAnbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToAnbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToAnbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
