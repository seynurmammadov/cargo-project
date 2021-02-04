import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToAnbarNewParcelComponent } from './add-to-anbar-new-parcel.component';

describe('AddToAnbarNewParcelComponent', () => {
  let component: AddToAnbarNewParcelComponent;
  let fixture: ComponentFixture<AddToAnbarNewParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToAnbarNewParcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToAnbarNewParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
