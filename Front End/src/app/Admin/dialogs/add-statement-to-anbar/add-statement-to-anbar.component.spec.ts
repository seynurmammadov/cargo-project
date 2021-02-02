import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatementToAnbarComponent } from './add-statement-to-anbar.component';

describe('AddStatementToAnbarComponent', () => {
  let component: AddStatementToAnbarComponent;
  let fixture: ComponentFixture<AddStatementToAnbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStatementToAnbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatementToAnbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
