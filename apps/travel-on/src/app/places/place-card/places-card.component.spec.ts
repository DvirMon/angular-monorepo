import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCardComponent } from './places-card.component';
import { ComponentRef } from '@angular/core';
import { Places } from '../places.model';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('PlacesCardComponent', () => {
  let component: PlacesCardComponent;
  let componentRef: ComponentRef<PlacesCardComponent>;
  let fixture: ComponentFixture<PlacesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlacesCardComponent],
      providers: [provideAnimations()],
    });
    fixture = TestBed.createComponent(PlacesCardComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;

    componentRef.setInput('place', {
      id: '1',
      destination: { city: 'test', country: 'test' },
      activities: ['test'],
      imageUrl: 'test',
      price: 1,
      rating: 1,
      takeoff: new Date(),
      landing: new Date(),
    } as Places);
    componentRef.setInput('selected', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
