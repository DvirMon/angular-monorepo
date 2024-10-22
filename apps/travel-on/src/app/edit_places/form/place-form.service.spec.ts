import { TestBed } from '@angular/core/testing';

import { PlaceFormService } from './place-form.service';
import { provideFirebase } from '../../shared/providers/firebase';

describe('PlaceFormService', () => {
  let service: PlaceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceFormService, provideFirebase()],
    });
    service = TestBed.inject(PlaceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
