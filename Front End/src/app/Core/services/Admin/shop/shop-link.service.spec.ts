import { TestBed } from '@angular/core/testing';

import { ShopLinkService } from './shop-link.service';

describe('ShopLinkService', () => {
  let service: ShopLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
