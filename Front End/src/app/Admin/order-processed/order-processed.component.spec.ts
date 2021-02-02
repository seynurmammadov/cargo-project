import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessedComponent } from './order-processed.component';

describe('OrderProcessedComponent', () => {
  let component: OrderProcessedComponent;
  let fixture: ComponentFixture<OrderProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProcessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
