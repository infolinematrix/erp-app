import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SetupGuard } from './core/guards/setup.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [SetupGuard, AuthGuard], 
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '',
    // canActivate: [SetupGuard], 
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'setup',
    loadChildren: () => import('./modules/setup/setup.module').then((m) => m.SetupModule),
  },
  
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  { 
    path: '**', 
    redirectTo: 'errors/404' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
