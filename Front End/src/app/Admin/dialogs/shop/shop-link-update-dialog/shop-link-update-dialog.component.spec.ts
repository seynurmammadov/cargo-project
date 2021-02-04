import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLinkUpdateDialogComponent } from './shop-link-update-dialog.component';

describe('ShopLinkUpdateDialogComponent', () => {
  let component: ShopLinkUpdateDialogComponent;
  let fixture: ComponentFixture<ShopLinkUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopLinkUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopLinkUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
