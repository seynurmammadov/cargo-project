import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryInfoCreateComponent } from './country-info-create.component';

describe('CountryInfoCreateComponent', () => {
  let component: CountryInfoCreateComponent;
  let fixture: ComponentFixture<CountryInfoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryInfoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryInfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
