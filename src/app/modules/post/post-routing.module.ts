import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostHomeComponent } from './post-home/post-home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCreateComponent } from './post-create/post-create.component';

const routes: Routes = [
  {
    path: '',
    component: PostHomeComponent
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: ':id',
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
