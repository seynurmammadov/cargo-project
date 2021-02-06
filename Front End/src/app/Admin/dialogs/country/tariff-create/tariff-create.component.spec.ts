import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffCreateComponent } from './tariff-create.component';

describe('TariffCreateComponent', () => {
  let component: TariffCreateComponent;
  let fixture: ComponentFixture<TariffCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TariffCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
