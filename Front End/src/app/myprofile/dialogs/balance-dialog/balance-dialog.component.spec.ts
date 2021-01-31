import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDialogComponent } from './balance-dialog.component';

describe('BalanceDialogComponent', () => {
  let component: BalanceDialogComponent;
  let fixture: ComponentFixture<BalanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
