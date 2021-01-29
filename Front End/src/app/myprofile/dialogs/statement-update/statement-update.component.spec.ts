import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementUpdateComponent } from './statement-update.component';

describe('StatementUpdateComponent', () => {
  let component: StatementUpdateComponent;
  let fixture: ComponentFixture<StatementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
