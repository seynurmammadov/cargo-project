import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingInvoiceDialogComponent } from './waiting-invoice-dialog.component';

describe('WaitingInvoiceDialogComponent', () => {
  let component: WaitingInvoiceDialogComponent;
  let fixture: ComponentFixture<WaitingInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingInvoiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
