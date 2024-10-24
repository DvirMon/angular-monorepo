import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './auth.model';
import { API_URL } from '../../shared/tokens';

@Injectable({ providedIn: 'root' })
export class UserService {

  readonly #http = inject(HttpClient);

  readonly #apiUrl = inject(API_URL);


  public getUser(idToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.#http.get<User>(`${this.#apiUrl}/users/profile`, { headers });
  }

  
}
