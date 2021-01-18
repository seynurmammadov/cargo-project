import { TestBed } from '@angular/core/testing';

import { AuthOutGuard } from './auth-out.guard';

describe('AuthOutGuard', () => {
  let guard: AuthOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
