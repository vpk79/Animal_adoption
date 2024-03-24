import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionArticlesComponent } from './adoption-articles.component';

describe('AdoptionArticlesComponent', () => {
  let component: AdoptionArticlesComponent;
  let fixture: ComponentFixture<AdoptionArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptionArticlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptionArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
