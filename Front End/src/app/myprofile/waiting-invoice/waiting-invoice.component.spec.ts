import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingInvoiceComponent } from './waiting-invoice.component';

describe('WaitingInvoiceComponent', () => {
  let component: WaitingInvoiceComponent;
  let fixture: ComponentFixture<WaitingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
