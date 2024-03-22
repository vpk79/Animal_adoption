import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefullAdoptionLinksComponent } from './usefull-adoption-links.component';

describe('UsefullAdoptionLinksComponent', () => {
  let component: UsefullAdoptionLinksComponent;
  let fixture: ComponentFixture<UsefullAdoptionLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsefullAdoptionLinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsefullAdoptionLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
