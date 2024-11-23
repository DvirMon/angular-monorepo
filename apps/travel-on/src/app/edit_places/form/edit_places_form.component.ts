import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Activity, Places } from '../../places/places.model';
import { OptionTestComponent } from '../option-test.component';
import { compareString } from './form.validators';
import { PlaceForm, PlaceFormService } from './place-form.service';


@Component({
  selector: 'to-edit-places-form',
  standalone: true,
  imports: [
    TitleCasePipe,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    OptionTestComponent
  ],
  templateUrl: './edit_places_form.component.html',
  styleUrl: './edit_places_form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlaceFormService],
})
export class EditPlacesFormComponent implements OnInit {
  #placeFormService = inject(PlaceFormService);

  place = input.required<Partial<Places>>();

  placesForm: FormGroup<PlaceForm> = this.#placeFormService.getPlaceFormGroup();

  countriesOptions = this.#placeFormService.getCountriesOptions();

  #currentCountry$ = this.#placeFormService.getCountryValueChanges$(
    this.placesForm
  );

  citiesOptions = this.#placeFormService.getCitiesOptions(
    this.#currentCountry$
  );

  activitiesOptions = this.#placeFormService.getActivitiesOptions();

  ngOnInit(): void {
    this.placesForm.setValue(this.place() as Places);
  }

  onSubmit(): void {
    console.log('submit', this.placesForm.value);
  }

  compareWithCountries(o1: string, o2: string): boolean {
    return compareString(o1, o2);
  }
  compareCitiesWith(o1: string, o2: string): boolean {
    return compareString(o1, o2);
  }

  compareActivitiesWith(o1: Activity, o2: Activity): boolean {
    return compareString(o1.name, o2.name);
  }

  compareCallback(option: Activity, selectedValues: Activity[]): boolean {
    return selectedValues.includes(option);
  }
}
