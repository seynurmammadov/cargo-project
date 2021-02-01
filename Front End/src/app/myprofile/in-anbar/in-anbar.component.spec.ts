import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InAnbarComponent } from './in-anbar.component';

describe('InAnbarComponent', () => {
  let component: InAnbarComponent;
  let fixture: ComponentFixture<InAnbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InAnbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InAnbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
