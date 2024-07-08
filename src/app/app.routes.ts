import { Routes } from '@angular/router';
import { PostLayoutComponent } from './layouts/post-layout/post-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'post',
    pathMatch: 'full'
  },
  {
    path: 'post',
    component: PostLayoutComponent,
    loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];
