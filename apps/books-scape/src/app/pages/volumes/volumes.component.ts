import {
  Component,
  Injector,
  Signal,
  inject,
  runInInjectionContext,
} from '@angular/core';

import { JsonPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BookCardComponent } from '../../books/book-card/book-card.component';
import { Book } from '../../books/books';
import { LayoutComponent } from '../../layout/layout.component';
import { AppStore } from '../../store/store';
import { FormSearchComponent } from '@dom/components/form/inputs/form-search-input';

@Component({
  selector: 'books-scape-volume-page',
  standalone: true,
  imports: [JsonPipe, LayoutComponent, BookCardComponent, FormSearchComponent],
  templateUrl: './volumes.component.html',
  styleUrls: ['./volumes.component.scss'],
})
export class VolumesPageComponent {
  #store = inject(AppStore);
  #injector = inject(Injector);

  searchControl = new FormControl<string>('angular', { nonNullable: true });

  public readonly books: Signal<Book[]>;
  public readonly initialValue: Signal<string>;

  constructor() {
    this.books = this.#store.volumesEntities;
    this.initialValue = this.#store.searchTerm;
  }

  onValueChanged(value: string): void {
    this.#store.updateVolumes(value);
  }

  onAddToShelf(newBook: Book): void {
    this.#store.addToShelf(newBook);
  }

  onInfo(volId: string): void {
    runInInjectionContext(this.#injector, () =>
      inject(Router).navigateByUrl(`info/${volId}`)
    );
  }
}
