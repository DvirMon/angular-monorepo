import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iif, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { API_URL } from '../shared/tokens';
import { Favorite } from './model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteHttpService {
  readonly #apiUrl = inject(API_URL);

  readonly #url = this.#apiUrl + '/favorites';

  readonly #http = inject(HttpClient);

  // Load favorites for a user
  public loadFavorites(uid: string): Observable<Favorite> {
    return this.#http
      .get<Favorite | null>(`${this.#url}/${uid}`)
      .pipe(
        switchMap((favorite: Favorite | null) =>
          iif(
            () => !favorite,
            this.#createNewFavorite(uid),
            of(favorite as Favorite)
          )
        )
      );
  }

  // Create a new favorite document
  #createNewFavorite(uid: string): Observable<Favorite> {
    return this.#http.post<Favorite>(this.#url, { uid });
  }

  // Update a favorite document
  public updateFavoriteDoc(docId: string, data: Favorite): Observable<void> {
    return this.#http.post<void>(`${this.#url}/update/${docId}`, data);
  }
}
