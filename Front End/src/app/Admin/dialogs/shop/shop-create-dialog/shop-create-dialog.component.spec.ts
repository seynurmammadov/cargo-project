import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCreateDialogComponent } from './shop-create-dialog.component';

describe('ShopCreateDialogComponent', () => {
  let component: ShopCreateDialogComponent;
  let fixture: ComponentFixture<ShopCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
