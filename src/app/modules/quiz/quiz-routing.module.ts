import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent
  },
  {
    path: 'create',
    component: QuizCreateComponent,
  },
  {
    path: 'edit',
    component: QuizEditComponent,
  },
  {
    path: 'detail',
    component: QuizDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
