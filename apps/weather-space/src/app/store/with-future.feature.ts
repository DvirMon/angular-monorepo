import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import {
  Entity,
  EntityLoader,
  LoaderService,
  createLoader,
  loadEntities,
  onLoadCollection,
} from '@dom/helpers';
import {
  FutureWeather,
  FutureWeatherArgs,
} from '../weather/models/future-weather-result';

type FutureWeatherLoader = EntityLoader<
  FutureWeatherArgs,
  Entity,
  'loadFutureWeather'
>;

const COLLECTION = 'future';

export function withFutureWeather(Loader: LoaderService<FutureWeatherLoader>) {
  return signalStoreFeature(
    withEntities({ entity: type<FutureWeather>(), collection: COLLECTION }),
    withMethods((store) => {
      const loader = createLoader(Loader, 'loadFutureWeather');
      return {
        loadFutureWeather: loadEntities(
          loader,
          onLoadCollection(store, COLLECTION)
        ),
      };
    })
  );
}
