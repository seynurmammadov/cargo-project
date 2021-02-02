import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInProcessComponent } from './order-in-process.component';

describe('OrderInProcessComponent', () => {
  let component: OrderInProcessComponent;
  let fixture: ComponentFixture<OrderInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderInProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
