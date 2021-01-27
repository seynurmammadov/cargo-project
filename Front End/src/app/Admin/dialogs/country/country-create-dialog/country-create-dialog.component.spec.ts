import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCreateDialogComponent } from './country-create-dialog.component';

describe('CountryCreateDialogComponent', () => {
  let component: CountryCreateDialogComponent;
  let fixture: ComponentFixture<CountryCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
