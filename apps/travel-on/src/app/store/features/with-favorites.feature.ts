import { computed, inject } from '@angular/core';
import {
  Entity,
  EntityLoader,
  LoaderService,
  createLoader,
  loadSlice,
} from '@dom/helpers';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap } from 'rxjs';
import { Favorite, FavoriteHttpService } from '../../favorites';

const SLICE = 'favorite';

type FavoritesLoader = EntityLoader<string, Entity, 'loadFavorites'>;

export type FavoriteSelection = { placeId: string; selected: boolean };

export function withFavorites(Loader: LoaderService<FavoritesLoader>) {
  return signalStoreFeature(
    withState<{ favorite: Favorite }>({ favorite: {} as Favorite }),
    withMethods((store) => {
      const loader = createLoader(Loader, 'loadFavorites');
      return {
        loadFavorites: loadSlice(loader, store, SLICE),
      };
    }),
    withMethods((store, service = inject(FavoriteHttpService)) => ({
      updateFavoriteDB: rxMethod<Favorite>(
        pipe(
          switchMap((updatedData: Favorite) => {
            const { id } = updatedData;
            return service.updateFavoriteDoc(id, updatedData).pipe(
              tapResponse({
                next: () =>
                  patchState(store, (state) => ({
                    favorite: { ...state.favorite, ...updatedData },
                  })),
                error: () => EMPTY,
              })
            );
          })
        )
      ),
    })),
    withComputed(({ favorite }) => ({
      favoriteMap: computed(() => mapVacationIdsToRecord(favorite())),
    }))
  );
}

function mapVacationIdsToRecord(favorite: Favorite): Record<string, boolean> {
  if (!isObjectEmpty(favorite)) {
    return favorite.vacationIds.reduce((acc, value) => {
      return {
        ...acc,
        [value]: true,
      };
    }, {} as Record<string, boolean>);
  } else {
    return {};
  }
}

function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
