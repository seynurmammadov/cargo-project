import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLinkComponent } from './shop-link.component';

describe('ShopLinkComponent', () => {
  let component: ShopLinkComponent;
  let fixture: ComponentFixture<ShopLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
