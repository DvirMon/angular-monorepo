import { TestBed } from '@angular/core/testing';

import { PlacesHttpService } from './places-http.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PlacesHttpService', () => {
  let service: PlacesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PlacesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
