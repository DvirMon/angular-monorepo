import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'to-place-skeleton',
  standalone: true,
  imports: [MatCardModule, NgxSkeletonLoaderModule, SkeletonModule],
  templateUrl: './place-skeleton.component.html',
  styleUrl: './place-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceSkeletonComponent {}
