import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLinkCreateDialogComponent } from './shop-link-create-dialog.component';

describe('ShopLinkCreateDialogComponent', () => {
  let component: ShopLinkCreateDialogComponent;
  let fixture: ComponentFixture<ShopLinkCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopLinkCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopLinkCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
