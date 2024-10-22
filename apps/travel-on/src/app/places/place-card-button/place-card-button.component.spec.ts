import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceCardButtonComponent } from './place-card-button.component';

import { ComponentRef } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('PlaceCardButtonComponent', () => {
  let component: PlaceCardButtonComponent;
  let fixture: ComponentFixture<PlaceCardButtonComponent>;
  let componentRef: ComponentRef<PlaceCardButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlaceCardButtonComponent],
      providers : [provideAnimations()]
    });
    fixture = TestBed.createComponent(PlaceCardButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;


    componentRef.setInput('selected', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
