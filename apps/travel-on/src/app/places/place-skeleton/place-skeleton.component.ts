import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'to-place-skeleton',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './place-skeleton.component.html',
  styleUrl: './place-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceSkeletonComponent {}
