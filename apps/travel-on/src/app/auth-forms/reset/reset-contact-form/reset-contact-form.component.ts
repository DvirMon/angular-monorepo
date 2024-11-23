import { TitleCasePipe } from '@angular/common';
import {
  Component,
  Injector,
  WritableSignal,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { DividerHeaderComponent } from '@dom/components/divider-header';
import {
  getFormKeys,
  handleServerErrorEffect,
} from '@dom/components/form/helpers';
import { FormInputComponent } from '@dom/components/form/inputs/form-input';
import { FormServerError } from '@dom/components/form/types';

interface ResetContactForm {
  email: FormControl<string>;
}

@Component({
  selector: 'to-reset-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    MatCard,
    MatCardContent,
    MatButton,
    MatIcon,
    FormInputComponent,
    DividerHeaderComponent,
  ],
  templateUrl: './reset-contact-form.component.html',
  styleUrl: './reset-contact-form.component.scss',
})
export class ResetContactFormComponent {
  #injector = inject(Injector);

  serverError = input<FormServerError>();

  public readonly resetFormGroup: FormGroup<ResetContactForm>;
  public readonly formKeys: WritableSignal<(keyof ResetContactForm)[]>;

  resetEmail = output<string>();

  constructor() {
    this.resetFormGroup = this._buildResetForm();
    this.formKeys = getFormKeys(this.resetFormGroup);

    handleServerErrorEffect(
      this.#injector,
      this.serverError,
      this.resetFormGroup
    );
  }

  private _buildResetForm(): FormGroup<ResetContactForm> {
    return inject(NonNullableFormBuilder).group({
      email: ['DEFAULT_EMAIL', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(value: Partial<{ email: string }>): void {
    this.resetEmail.emit(value.email as string);
  }
}
