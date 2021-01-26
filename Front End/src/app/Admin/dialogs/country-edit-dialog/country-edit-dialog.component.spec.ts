import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryEditDialogComponent } from './country-edit-dialog.component';

describe('CountryEditDialogComponent', () => {
  let component: CountryEditDialogComponent;
  let fixture: ComponentFixture<CountryEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
