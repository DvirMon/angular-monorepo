import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ButtonSelectionChangedEvent,
  PlaceCardButtonComponent,
} from '../place-card-button/place-card-button.component';
import { Places } from '../places.model';
import { MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';

export interface SelectChangedEvent {
  /** The source button of the event. */
  source: PlacesCardComponent;
  /** The new `selected` value of the button. */
  selected: boolean;
}
@Component({
  selector: 'to-places-card',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatCardModule,
    PlaceCardButtonComponent,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './places-card.component.html',
  styleUrls: ['./places-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesCardComponent {
  place = input.required<Places>();

  selected = input.required<boolean>();

  router = inject(Router);

  isGrid = input<boolean>(true);

  showOverlay = signal(false);

  readonly selectedChanged = output<SelectChangedEvent>();

  private _createChangedEvent(
    value: ButtonSelectionChangedEvent
  ): SelectChangedEvent {
    const event: SelectChangedEvent = {
      selected: value.selected,
      source: this,
    };
    return event;
  }

  public onSelectedChanged(value: ButtonSelectionChangedEvent): void {
    const event = this._createChangedEvent(value);
    this.selectedChanged.emit(event);
  }

  onToggleOverlay(): void {
    this.showOverlay.update((value) => !value);
  }

  onEdit(): void {
    this.router.navigateByUrl('admin/' + this.place().id);
  }
}
