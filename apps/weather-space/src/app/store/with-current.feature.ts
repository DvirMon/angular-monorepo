import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import {
  Entity,
  EntityLoader,
  LoaderService,
  createLoader,
  loadEntities,
  onLoadCollection,
} from '@dom/helpers';
import { withEntities } from '@ngrx/signals/entities';
import { CurrentWeather } from '../weather/models/current-weather-result';

type WeatherLoader = EntityLoader<number, Entity, 'loadCurrentWeather'>;

const COLLECTION = 'current';

export function withCurrentWeather(Loader: LoaderService<WeatherLoader>) {
  return signalStoreFeature(
    withEntities({ entity: type<CurrentWeather>(), collection: COLLECTION }),
    withMethods((store) => {
      const loader = createLoader(Loader, 'loadCurrentWeather');
      return {
        loadCurrentWeather: loadEntities(
          loader,
          onLoadCollection(store, COLLECTION)
        ),
      };
    })
  );
}
