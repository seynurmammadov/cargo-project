import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierServiceComponent } from './courier-service.component';

describe('CourierServiceComponent', () => {
  let component: CourierServiceComponent;
  let fixture: ComponentFixture<CourierServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
