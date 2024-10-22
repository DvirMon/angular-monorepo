import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideErrorService } from './shared/error.service';
import { errorInterceptor } from './shared/http/error.interceptor';
import { provideApiUrl } from './shared/providers/apiUrl';
import { provideFirebase } from './shared/providers/firebase';
import { provideDefaultEmail } from './shared/providers/degualtEmail';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    provideFirebase(),
    provideApiUrl(),
    provideDefaultEmail(),
    provideErrorService(),
    importProvidersFrom(NgxSkeletonLoaderModule),
  ],
};
