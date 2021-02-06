import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCreateComponent } from './price-create.component';

describe('PriceCreateComponent', () => {
  let component: PriceCreateComponent;
  let fixture: ComponentFixture<PriceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
