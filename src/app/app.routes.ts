import { Routes } from '@angular/router';
import { PostLayoutComponent } from './layouts/post-layout/post-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'post',
    pathMatch: 'full'
  },
  {
    path: 'post',
    canActivate: [authGuard],
    component: PostLayoutComponent,
    loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule)
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];
