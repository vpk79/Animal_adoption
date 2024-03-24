import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverFooterLineComponent } from './over-footer-line.component';

describe('OverFooterLineComponent', () => {
  let component: OverFooterLineComponent;
  let fixture: ComponentFixture<OverFooterLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverFooterLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverFooterLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
