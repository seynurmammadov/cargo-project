import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelInfoComponent } from './parcel-info.component';

describe('ParcelInfoComponent', () => {
  let component: ParcelInfoComponent;
  let fixture: ComponentFixture<ParcelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
