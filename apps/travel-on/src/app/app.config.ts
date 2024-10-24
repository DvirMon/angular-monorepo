import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { appRoutes } from './app.routes';
import { provideErrorService } from './shared/error.service';
import { errorInterceptor } from './shared/http/error.interceptor';
import { provideZonelessFirebase } from './shared/providers/zoneless-firebase';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    // provideZonelessFirebase({
    //   options: environment.firebaseConfig,
    //   features: { auth: { emulators: { host: 'localhost', port: 9099 } } },
    // }),
    provideErrorService(),
    importProvidersFrom(NgxSkeletonLoaderModule),
  ],
};
