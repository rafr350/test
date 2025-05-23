import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter ,withComponentInputBinding} from '@angular/router';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptors';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    // provideHttpClient()

    provideHttpClient(
      withInterceptors([authInterceptor]),
    )
  ]
};
