import { computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { EditPlacesService } from '../../pages/edit_places/edit-places.service';
import { Activity, DestinationItem } from '../../places/places.model';
import { maxSelectionValidator } from './form.validators';

export type PlaceForm = {
  destination: FormGroup<{
    city: FormControl<string>;
    country: FormControl<string>;
  }>;
  price: FormControl<number>;
  takeoff: FormControl<Date>;
  landing: FormControl<Date>;
  imageUrl: FormControl<string>;
  activities: FormControl<string[]>;
  rating: FormControl<number>;
};

export class PlaceFormService {
  #nfb = inject(NonNullableFormBuilder);
  #editService = inject(EditPlacesService);

  #destinations = toSignal(this.#editService.loadDestinationList(), {
    initialValue: [],
  });

  getActivitiesOptions(): Signal<Activity[]> {
    return toSignal(this.#editService.loadActivitiesCollection(), {
      initialValue: [],
    });
  }

  getCountriesOptions(): Signal<string[]> {
    return computed(() => this.#destinations().map((des) => des.country));
  }

  getCitiesOptions(currentCountry$: Observable<string>): Signal<string[]> {
    const currentCountry = this.#initCurrentCountrySignal(currentCountry$);
    return computed(() => {
      const found = this.#destinations().find(
        (des: DestinationItem) => des.country.toLowerCase() === currentCountry()
      );

      return found ? found.cities : [];
    });
  }

  getCountryValueChanges$(form: FormGroup<PlaceForm>): Observable<string> {
    return form.controls.destination.controls.country.valueChanges.pipe(
      distinctUntilChanged(),
      map((value: string) => value.toLowerCase())
    );
  }

  getPlaceFormGroup(): FormGroup<PlaceForm> {
    return this.#nfb.group({
      destination: this.#nfb.group({
        city: this.#nfb.control<string>(''),
        country: this.#nfb.control<string>(''),
      }),
      price: this.#nfb.control<number>(0, [
        Validators.required,
        Validators.min(0),
      ]),
      takeoff: this.#nfb.control<Date>(new Date(0, 0), [
        Validators.required,
      ]),
      landing: this.#nfb.control<Date>(new Date(0, 0), [
        Validators.required,
      ]),
      imageUrl: this.#nfb.control<string>('', [
        Validators.required,
        Validators.pattern('https?://.+'),
      ]),
      activities: this.#nfb.control<string[]>([], [maxSelectionValidator(3)]),
      rating: this.#nfb.control(0, [Validators.min(0), Validators.max(5)]),
    });
  }

  #initCurrentCountrySignal(
    currentCountry$: Observable<string>
  ): Signal<string> {
    return toSignal(currentCountry$, { initialValue: '' });
  }
}
