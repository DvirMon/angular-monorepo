import {
  Entity,
  EntityLoader,
  LoaderService,
  createLoader,
  loadEntities,
  onLoadCollection,
} from '@dom/helpers';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { lastValueFrom } from 'rxjs';
import { AutocompleteOption } from '../weather/models/autocomplete-result';

type OptionLoader = EntityLoader<string, Entity, 'loadOptions'>;

const COLLECTION = 'options';

export function withOptions(Loader: LoaderService<OptionLoader>) {
  return signalStoreFeature(
    withEntities({
      entity: type<AutocompleteOption>(),
      collection: COLLECTION,
    }),
    withMethods((store) => {
      const loader = createLoader(Loader, 'loadOptions');
      return {
        loadOptions: loadEntities(loader, onLoadCollection(store, COLLECTION)),

        async loadOptionAsync(query: string) {
          const res = await lastValueFrom(loader(query));
          const options = res as AutocompleteOption[];
          patchState(store, addEntities(options, { collection: COLLECTION }));
        },
      };
    })
  );
}
