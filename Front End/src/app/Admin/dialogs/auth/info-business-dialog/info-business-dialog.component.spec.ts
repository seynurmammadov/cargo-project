import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBusinessDialogComponent } from './info-business-dialog.component';

describe('InfoBusinessDialogComponent', () => {
  let component: InfoBusinessDialogComponent;
  let fixture: ComponentFixture<InfoBusinessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBusinessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBusinessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
