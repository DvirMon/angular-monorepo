import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../shared/tokens';
import { Places } from './places.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesHttpService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = inject(API_URL);

  public loadPlaces(): Observable<Places[]> {
    const url = `${this.#apiUrl}/places`;
    return this.#http.get<Places[]>(url);
  }
}
