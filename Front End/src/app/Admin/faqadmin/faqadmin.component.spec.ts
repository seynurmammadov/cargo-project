import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQAdminComponent } from './faqadmin.component';

describe('FAQAdminComponent', () => {
  let component: FAQAdminComponent;
  let fixture: ComponentFixture<FAQAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
