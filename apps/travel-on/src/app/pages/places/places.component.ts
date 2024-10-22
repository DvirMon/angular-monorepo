import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  Signal,
  inject,
  input,
  runInInjectionContext,
} from '@angular/core';
import { FloatingButtonComponent } from '@dom/components/floating-button';
import { ParallaxDirective } from '@dom/directives';
import { AuthStore } from '../../auth/store/store';
import {
  PlacesListComponent,
  SelectionListChange,
} from '../../places/place-list/place-list.component';
import { PlacesHeaderComponent } from '../../places/places-header/places-header.component';
import { Places } from '../../places/places.model';
import { AppStore } from '../../store/store';
import { updateFavoriteEntity } from './places.helpers';
import { PlacesPageService } from './places.service';

@Component({
  selector: 'to-places',
  standalone: true,
  imports: [
    JsonPipe,
    PlacesHeaderComponent,
    PlacesListComponent,
    FloatingButtonComponent,
    ParallaxDirective,
  ],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesPageComponent implements OnInit {
  #injector = inject(Injector);
  #store = inject(AppStore);
  #layout = inject(PlacesPageService);
  

  userId = input.required<string>();

  public readonly places: Signal<Places[]>;
  public readonly selection: Signal<Record<string, boolean>>;
  public readonly isGrid: Signal<boolean>;
  public readonly isLoaded: Signal<boolean>;

  constructor() {
    this.places = this.#store.placesEntities;
    this.selection = this.#store.favoriteMap;
    this.isLoaded = this.#store.isLoaded;
    this.isGrid = this.#layout.getIsGrid();
  }

  ngOnInit(): void {
    this.#store.loadPlaces();
    this.#store.loadFavorites(this.userId);
  }

  onSelectionChanged(event: SelectionListChange): void {
    const { currentSelection } = event;

    const updateData = updateFavoriteEntity(
      this.#store.favorite(),
      currentSelection
    );

    this.#store.updateFavoriteDB(updateData);
  }

  onLogout(): void {
    runInInjectionContext(this.#injector, () => inject(AuthStore).logout());
  }
}
