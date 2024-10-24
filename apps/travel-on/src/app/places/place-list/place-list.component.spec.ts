import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesListComponent } from './place-list.component';
import { ComponentRef } from '@angular/core';

describe('PlacesListComponent', () => {
  let component: PlacesListComponent;
  let componentRef: ComponentRef<PlacesListComponent>;
  let fixture: ComponentFixture<PlacesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlacesListComponent],
    });
    fixture = TestBed.createComponent(PlacesListComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;

    componentRef.setInput('places', [{ id: 1, name: 'test' }]);
    componentRef.setInput('selection', {});
    componentRef.setInput('isLoaded', false);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
