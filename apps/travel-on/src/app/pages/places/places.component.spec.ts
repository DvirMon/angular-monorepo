import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PlacesPageComponent } from './places.component';
import { ActivatedRoute } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('PlacesPageComponent', () => {
  let component: PlacesPageComponent;
  let fixture: ComponentFixture<PlacesPageComponent>;
  let componentRef: ComponentRef<PlacesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlacesPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            useValue: {
              snapshot: { params: { userId: '24fkzrw3487943uf358lovd' } },
            },
          },
        },
        provideHttpClient(), provideHttpClientTesting()],

    });
    fixture = TestBed.createComponent(PlacesPageComponent);

    component = fixture.componentInstance;

    componentRef = fixture.componentRef;

    componentRef.setInput('userId', '24fkzrw3487943uf358lovd');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
