import { TestBed } from '@angular/core/testing';

import { PlaceFormService } from './place-form.service';
import { EditPlacesService } from '../../pages/edit_places/edit-places.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PlaceFormService', () => {
  let service: PlaceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PlaceFormService,
        EditPlacesService,
      ],
    });
    service = TestBed.inject(PlaceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
