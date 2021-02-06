import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffPricesComponent } from './tariff-prices.component';

describe('TariffPricesComponent', () => {
  let component: TariffPricesComponent;
  let fixture: ComponentFixture<TariffPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TariffPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
