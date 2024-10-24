import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingButtonComponent } from './floating-button.component';
import { ActivatedRoute } from '@angular/router';

describe('FloatingButtonComponent', () => {
  let component: FloatingButtonComponent;
  let fixture: ComponentFixture<FloatingButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FloatingButtonComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    });
    fixture = TestBed.createComponent(FloatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
