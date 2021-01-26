import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesAllComponent } from './countries-all.component';

describe('CountriesAllComponent', () => {
  let component: CountriesAllComponent;
  let fixture: ComponentFixture<CountriesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
