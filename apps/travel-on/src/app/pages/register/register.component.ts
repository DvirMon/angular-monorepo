import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  effect,
  inject,
} from '@angular/core';
import { Register, RegisterFormComponent } from '../../auth';
import { AuthStore } from '../../auth/store/store';
import { FormServerError } from '@dom/components/form/types';
import { CardButtonComponent } from '@dom/components/card-button';

@Component({
  selector: 'to-register-page',
  standalone: true,
  imports: [RegisterFormComponent, CardButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthStore],
})
export class RegisterPageComponent {
  #authStore = inject(AuthStore);

  public readonly serverError: Signal<FormServerError | undefined>;

  constructor() {
    this.serverError = this.#authStore.registerError;

    effect(() => {
      if (this.#authStore.isLoaded()) {
        this.#authStore.login();
      }
    });
  }
  onRegister(value: Register): void {
    this.#authStore.register(value);
  }
}
