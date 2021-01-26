import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAdminComponent } from './title-admin.component';

describe('TitleAdminComponent', () => {
  let component: TitleAdminComponent;
  let fixture: ComponentFixture<TitleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
