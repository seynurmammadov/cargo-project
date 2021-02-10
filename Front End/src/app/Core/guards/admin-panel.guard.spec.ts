import { TestBed } from '@angular/core/testing';

import { AdminPanelGuard } from './admin-panel.guard';

describe('AdminPanelGuard', () => {
  let guard: AdminPanelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminPanelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
