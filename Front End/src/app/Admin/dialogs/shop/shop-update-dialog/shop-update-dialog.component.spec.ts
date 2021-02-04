import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopUpdateDialogComponent } from './shop-update-dialog.component';

describe('ShopUpdateDialogComponent', () => {
  let component: ShopUpdateDialogComponent;
  let fixture: ComponentFixture<ShopUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
