import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import {
  addEntities,
  removeAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap } from 'rxjs';
import { PlacesHttpService } from '../../places/places-http.service';
import { Places } from '../../places/places.model';

const PLACES_COLLECTION = 'places';


export function withPlaces() {
  return signalStoreFeature(
    withEntities({ entity: type<Places>(), collection: PLACES_COLLECTION }),
  
    withMethods((store, service = inject(PlacesHttpService)) => ({
      loadPlaces: rxMethod<void>(
        pipe(
          switchMap(() =>
            service.loadPlaces().pipe(
              tapResponse({
                next: (places) =>
                  patchState(
                    store,
                    addEntities(places, { collection: PLACES_COLLECTION })
                  ),
                error: () => EMPTY,
              })
            )
          )
        )
      ),
      removePlaces() {
        patchState(store, removeAllEntities({ collection: PLACES_COLLECTION }));
      },
    })),
    withComputed(({ placesEntities }) => ({
      isLoaded: computed(() => placesEntities().length > 0),
    }))
  );
}
