import { Routes } from '@angular/router';
import { PostLayoutComponent } from './layouts/post-layout/post-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { QuizLayoutComponent } from './layouts/quiz-layout/quiz-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'quiz',
    pathMatch: 'full'
  },
  {
    path: 'post',
    canActivate: [authGuard],
    component: PostLayoutComponent,
    loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule)
  },
  {
    path: 'quiz',
    canActivate: [authGuard],
    component: QuizLayoutComponent,
    loadChildren: () => import('./modules/quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];
