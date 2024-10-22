import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { FavoriteSelection } from '../../store/features/with-favorites.feature';
import {
  PlacesCardComponent,
  SelectChangedEvent,
} from '../place-card/places-card.component';
import { PlaceSkeletonComponent } from '../place-skeleton/place-skeleton.component';
import { Places } from '../places.model';

export interface SelectionListChange {
  source: PlacesListComponent;
  currentSelection: FavoriteSelection;
}

@Component({
  selector: 'to-places-list',
  standalone: true,
  imports: [PlaceSkeletonComponent, PlacesCardComponent],
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesListComponent {
  placesSkeleton = new Array(6);

  places = input.required<Places[]>();
  selection = input.required<Record<string, boolean>>();
  isLoaded = input.required<boolean>();
  isGrid = input<boolean>(true);

  selectionChanged = output<SelectionListChange>();

  gridClass = computed(() =>
    this.isGrid() ? 'grid-container' : 'list-container'
  );

  public onSelectedChanged(event: SelectChangedEvent): void {
    const { source, selected } = event;
    const { place } = source;

    this._emitChangeEvent({
      placeId: place().id,
      selected,
    } as FavoriteSelection);
  }

  _emitChangeEvent(currentSelection: FavoriteSelection) {
    const event = { source: this, currentSelection } as SelectionListChange;
    this.selectionChanged.emit(event);
  }
}
