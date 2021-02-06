import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceUpdateComponent } from './price-update.component';

describe('PriceUpdateComponent', () => {
  let component: PriceUpdateComponent;
  let fixture: ComponentFixture<PriceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
