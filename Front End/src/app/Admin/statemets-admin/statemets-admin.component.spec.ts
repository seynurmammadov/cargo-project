import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatemetsAdminComponent } from './statemets-admin.component';

describe('StatemetsAdminComponent', () => {
  let component: StatemetsAdminComponent;
  let fixture: ComponentFixture<StatemetsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatemetsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatemetsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
