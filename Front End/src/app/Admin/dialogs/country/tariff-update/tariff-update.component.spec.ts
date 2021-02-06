import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffUpdateComponent } from './tariff-update.component';

describe('TariffUpdateComponent', () => {
  let component: TariffUpdateComponent;
  let fixture: ComponentFixture<TariffUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TariffUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
