import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { IconRegistryService } from './service/icon-registry.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponentStore } from './store/app.state';
import { AppService } from './service';
import { EMPTY, catchError, finalize, map, tap } from 'rxjs';

function initializeAppFactory(service: AppService, store: AppComponentStore) {
  store.setLoading(true);
  return () =>
    service.initService().pipe(
      map((data) => data),
      tap(([country, town, village]) => {
        console.log('ccc', country);
        store.setMapData({ country, town, village });
        store.setVoteData({ country, town, village });
      }),
      finalize(() => store.setLoading(false)),
      catchError(() => EMPTY)
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AppService, AppComponentStore],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (iconRegistryService: IconRegistryService) => () =>
        iconRegistryService.init(),
      deps: [IconRegistryService],
      multi: true,
    },
  ],
};
