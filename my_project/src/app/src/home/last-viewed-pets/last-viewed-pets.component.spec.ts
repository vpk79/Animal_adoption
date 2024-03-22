import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastViewedPetsComponent } from './last-viewed-pets.component';

describe('LastViewedPetsComponent', () => {
  let component: LastViewedPetsComponent;
  let fixture: ComponentFixture<LastViewedPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastViewedPetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastViewedPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
