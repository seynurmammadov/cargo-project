import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndedComponent } from './ended.component';

describe('EndedComponent', () => {
  let component: EndedComponent;
  let fixture: ComponentFixture<EndedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
