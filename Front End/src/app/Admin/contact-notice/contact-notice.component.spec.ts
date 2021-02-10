import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNoticeComponent } from './contact-notice.component';

describe('ContactNoticeComponent', () => {
  let component: ContactNoticeComponent;
  let fixture: ComponentFixture<ContactNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
