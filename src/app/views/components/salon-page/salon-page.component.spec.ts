import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonPageComponent } from './salon-page.component';

describe('SalonPageComponent', () => {
  let component: SalonPageComponent;
  let fixture: ComponentFixture<SalonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
