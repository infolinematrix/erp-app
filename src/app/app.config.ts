import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import Lara from '@primeng/themes/lara';
import Nora from "@primeng/themes/nora";
import { SessionService } from './core/services/session.service';
import { SettingsService } from './core/services/settings.service';
import { JwtModule } from '@nestjs/jwt';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './modules/auth/auth.interceptor';
import { PickupService } from './core/services/pickup.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'base, primeng, base',
          },
        },
      },
    }),

    

    
  ],
};
