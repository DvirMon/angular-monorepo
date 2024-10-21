import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Book, Item, VolumeInfo } from '../../books/books';
import { VolumesHttpService } from '../../books/http.service';

@Injectable({
  providedIn: 'root',
})
export class FiltersDataService {
  constructor(private bookHttp: VolumesHttpService) {}

  public loadFilterOptions(): Observable<Record<string, Book[]>> {
    const book1$ = this._loadOptions('Angular');
    const book2$ = this._loadOptions('Angular');
    const book3$ = this._loadOptions('Foundation');
    const book4$ = this._loadOptions('The Hobbit');

    return combineLatest([book1$, book2$, book3$, book4$]).pipe(
      map(([book1, book2, book3, book4]) => ({ book1, book2, book3, book4 })),
      take(1)
    );
  }

  // function to fetch books from Google Books API}
  private _loadOptions(query?: string): Observable<Book[]> {
    return this.bookHttp.fetchVolumes(query as string).pipe(
      map((items) => this.mapItemsToBooks(items)),
      map((books) => this.filterBooksWithImages(books))
    );
  }

  public loadOptions(query: string): Observable<Book[]> {
    return this.bookHttp.fetchVolumes(query).pipe(
      map((items) => this.mapItemsToBooks(items)),
      map((books) => this.filterBooksWithImages(books))
    );
  }

  // Map items to books
  private mapItemsToBooks(items: Item[]): Book[] {
    return items.map((item: Item) =>
      this.mapVolumeToBook(item.id, item.volumeInfo)
    );
  }

  // RxJS operator function to transform book data
  private mapVolumeToBook(id: string, volumeInfo: VolumeInfo): Book {
    return {
      id,
      title: volumeInfo.title,
      authors: volumeInfo.authors || [],
      description: volumeInfo.description,
      imageLinks: volumeInfo.imageLinks,
    };
  }

  // Filter books with images
  private filterBooksWithImages(books: Book[]): Book[] {
    return books.filter((book) => book.imageLinks != null);
  }
}
