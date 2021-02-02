import { TestBed } from '@angular/core/testing';

import { OrderAdminService } from './order-admin.service';

describe('OrderAdminService', () => {
  let service: OrderAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
