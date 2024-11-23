import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { EditPlacesFormComponent } from '../../edit_places/form/edit_places_form.component';
import { Places } from '../../places/places.model';
import { EditPlacesService } from './edit-places.service';

@Component({
  selector: 'to-edit-places',
  standalone: true,
  imports: [EditPlacesFormComponent],
  templateUrl: './edit_places.component.html',
  styleUrl: './edit_places.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlacesPageComponent implements OnInit {
  editService = inject(EditPlacesService);

  placeId = input.required<string>();

  placeItem = signal<Partial<Places>>({});

  isPlaceEmpty: Signal<boolean> = computed(() => {
    return Object.keys(this.placeItem()).length === 0;
  });

  ngOnInit(): void {
    this.editService
      .loadPlace(this.placeId())
      .subscribe((value) => this.placeItem.update(() => value));

  }
}
