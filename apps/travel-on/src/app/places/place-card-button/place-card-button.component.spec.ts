import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceCardButtonComponent } from './place-card-button.component';

import { ComponentRef } from '@angular/core';

describe('PlaceCardButtonComponent', () => {
  let component: PlaceCardButtonComponent;
  let fixture: ComponentFixture<PlaceCardButtonComponent>;
  let componentRef: ComponentRef<PlaceCardButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlaceCardButtonComponent]
    });
    fixture = TestBed.createComponent(PlaceCardButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('place', { id: 1, name: 'test' });
    componentRef.setInput('selected', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
