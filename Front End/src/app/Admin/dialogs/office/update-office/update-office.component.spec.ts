import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOfficeComponent } from './update-office.component';

describe('UpdateOfficeComponent', () => {
  let component: UpdateOfficeComponent;
  let fixture: ComponentFixture<UpdateOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
