import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../auth';
import { StorageKey } from '../../shared/constants';
import { clearStorage, setToStorage } from '../../shared/helpers';
import { AppStore } from '../../store/store';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly #router = inject(Router);
  readonly #store = inject(AppStore);

  public onLogout(): void {
    clearStorage();
    this.#router.navigateByUrl('/');
    this.#store.clearStore()
  }

  public onLogin(user: User): void {
    setToStorage(StorageKey.LOGGED, true);
    this.#router.navigateByUrl('places/' + user.userId);
  }
}
