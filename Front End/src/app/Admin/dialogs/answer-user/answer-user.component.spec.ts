import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerUserComponent } from './answer-user.component';

describe('AnswerUserComponent', () => {
  let component: AnswerUserComponent;
  let fixture: ComponentFixture<AnswerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
