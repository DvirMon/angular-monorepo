import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../auth';
import { StorageKey } from '../../shared/constants';
import { clearStorage, setToStorage } from '../../shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly #router = inject(Router);

  public onLogout(): void {
    clearStorage();
    console.log('called')
    this.#router.navigateByUrl('/');
  }

  public onLogin(user: User): void {
    setToStorage(StorageKey.LOGGED, true);
    this.#router.navigateByUrl('places/' + user.userId);
  }
}
