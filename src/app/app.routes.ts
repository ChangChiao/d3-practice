import { Route } from '@angular/router';
import { ShellComponent } from './shell/shell.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/overview/overview-page.routes').then(
            (m) => m.OVERVIEW_PAGE_ROUTES
          ),
      },
      {
        path: 'detail',
        loadChildren: () =>
          import('./pages/detail/detail-page.routes').then(
            (m) => m.DETAIL_PAGE_ROUTES
          ),
      },
      {
        path: 'rwd',
        loadChildren: () =>
          import('./pages/rwd/rwd-page.routes').then((m) => m.RWD_PAGE_ROUTES),
      },
      {
        path: 'ani',
        loadChildren: () =>
          import('./pages/animation/animation-page.routes').then(
            (m) => m.ANIMATION_PAGE_ROUTES
          ),
      },
    ],
  },
];
