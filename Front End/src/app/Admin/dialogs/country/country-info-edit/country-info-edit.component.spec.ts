import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryInfoEditComponent } from './country-info-edit.component';

describe('CountryInfoEditComponent', () => {
  let component: CountryInfoEditComponent;
  let fixture: ComponentFixture<CountryInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
