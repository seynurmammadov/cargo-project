import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryTariffComponent } from './country-tariff.component';

describe('CountryTariffComponent', () => {
  let component: CountryTariffComponent;
  let fixture: ComponentFixture<CountryTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryTariffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
