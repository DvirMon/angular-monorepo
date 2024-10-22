import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withHooks } from '@ngrx/signals';
import { PlacesHttpService } from '../places/places-http.service';
import { withPlaces } from './features/with-places.feature';
import { withFavorites } from './features/with-favorites.feature';
import { FavoriteHttpService } from '../favorites/favorite.https.service';

export const SignalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('store'),
  withPlaces(PlacesHttpService),
  withFavorites(FavoriteHttpService),
  withHooks((store) => ({
    onInit() {
      store.loadPlaces();
    },
  }))
);
